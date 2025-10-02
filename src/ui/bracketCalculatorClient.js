import { calcBracket } from '/src/calc/bracketCalculator.js';
import Chart from 'chart.js/auto';

// ---- global Chart.js speed tweaks ----
Chart.defaults.animation = false;
Chart.defaults.transitions.active.animation = false;

// --- re-entry guards ---
let isChartUpdating = false;   // prevents chart->UI loop
let isRendering     = false;   // prevents showBracket re-entry

// ---- single source of truth for sim assumptions ----
function getSimDefaults() {
  return {
    ageNow: 55,
    ageEnd: 90,
    iraStart: 400000,
    convertNow: 0,
    growth: 0.06,              // keep at 6% nominal for now
    taxRateFraction: 0.035,    // base RMD-like fraction
    currRate: 0.22,

    // drift knobs (tuned for visible divergence)
    inflation: 0.05,           // keep 5%
    taxRateDrift: 0.01 / 5,    // +1.0% every 5 years (~0.002 per year)
    rmdDrift: 0.001            // +0.10% per year (stronger RMD aggressiveness)
  };
}

// --- current selections (UI state) ---
const appState = {
  agi: 60000,
  status: 'single',
  sim: {
    ...getSimDefaults(),
    shortTermGains: 0,   // $ added as ordinary income (short-term)
    longTermGains: 0     // $ LTCG (taxed at 0/15/20)
  }
};

// --- single place to build params for BOTH headline & chart ---
function buildParams(room, ratePct) {
  return {
    ...appState.sim,                 // defaults + any UI overrides
    convertNow: room,                // robust room from calcBracket
    currRate: Number(ratePct) / 100, // 22 → 0.22
    agi: appState.agi,
    status: appState.status
  };
}

// Build annual + cumulative taxes with/without a Roth conversion.
function buildTaxesSeries(p = getSimDefaults()) {
  const {
    ageNow,
    ageEnd,
    iraStart,
    convertNow,
    growth,
    taxRateFraction,
    currRate,
    inflation,
    taxRateDrift,
    rmdDrift,
    shortTermGains = 0,
    longTermGains = 0,
  } = p;

  // ===== helper FIRST so it's available below =====
  const cum = (arr) =>
    arr.reduce((acc, v, i) => {
      acc[i] = (i ? acc[i - 1] : 0) + v;
      return acc;
    }, []);

  // years timeline
  const years = Array.from({ length: (ageEnd - ageNow) + 1 }, (_, i) => ageNow + i);

  // === Roth NO conversion block ===
  let baseNo = iraStart;
  const annualTaxNo = [];
  for (let y = 0; y < years.length; y++) {
    baseNo *= (1 + growth);

    const effRate = currRate + (y * taxRateDrift);      // drift tax rate
    const effFraction = taxRateFraction + (y * rmdDrift); // drift fraction

    const t = baseNo * effFraction * effRate;
    annualTaxNo.push(t);

    // inflation drag
    baseNo += baseNo * (effFraction + inflation * 0.01);
  }

  // === Roth WITH conversion block ===
  let baseWith = Math.max(0, iraStart - convertNow);
  const annualTaxWith = [];
  for (let y = 0; y < years.length; y++) {
    baseWith *= (1 + growth);

    const effRate = currRate + (y * taxRateDrift);
    const effFraction = taxRateFraction + (y * rmdDrift);

    let t = baseWith * effFraction * effRate;
    if (y === 0) t += convertNow * effRate; // conversion tax year 0

    annualTaxWith.push(t);

    baseWith += baseWith * (effFraction + inflation * 0.01);
  }

  // === Roth + Cap Gains block ===
  let baseWithGains = Math.max(0, iraStart - convertNow);
  const annualTaxWithGains = [];
  for (let y = 0; y < years.length; y++) {
    baseWithGains *= (1 + growth);

    const effRate = currRate + (y * taxRateDrift);
    const effFraction = taxRateFraction + (y * rmdDrift);

    let t = baseWithGains * effFraction * effRate;
    if (y === 0) t += convertNow * effRate;

    // add cap gains tax
    const gains = (shortTermGains * effRate) + (longTermGains * effRate);
    t += gains;

    annualTaxWithGains.push(t);

    baseWithGains += baseWithGains * (effFraction + inflation * 0.01);
  }

  // === Cumulative sums ===
  const cumNo        = cum(annualTaxNo);
  const cumWith      = cum(annualTaxWith);
  const cumWithGains = cum(annualTaxWithGains);

  return { years, cumNo, cumWith, cumWithGains, shortTermGains, longTermGains };
}

let taxesChart;
// --- chart scheduling + memo cache ---
let chartJob = 0;                              // latest job id wins
const seriesCache = Map ? new Map() : { set(){}, get(){}, has(){ return false; } };
const cacheKey = (p) =>
  `${p.agi}|${p.status}|${p.currRate}|${p.convertNow}|${p.ageNow}|${p.ageEnd ?? ''}|${p.shortTermGains}|${p.longTermGains}`;

function getTaxesSeriesCached(p){
  const k = cacheKey(p);
  let s = seriesCache.get(k);
  if (!s) { s = buildTaxesSeries(p); seriesCache.set(k, s); }
  return s;
}

function scheduleChartUpdate(params) {
  const myJob = ++chartJob;

  // let the UI (card/bar) paint first, then update chart
  requestAnimationFrame(() => {
    if (myJob !== chartJob) return; // a newer change arrived

    setTimeout(() => {              // keep at 0 ms; adjust if you want a touch more delay
      if (myJob !== chartJob) return;

      const canvas = document.getElementById('taxesLifetimeChart');
      if (!canvas) {
          console.warn('🛑 Chart canvas not found in DOM');
          return;
      }
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        console.warn('🛑 Chart context is null');
        return;
      }
      const series = getTaxesSeriesCached(params);
      renderTaxesLifetimeChart(ctx, series, { threshold: 250000 });
    }, 0);
  });
}
function renderTaxesLifetimeChart(ctx, series, opts = {}) {
  const { years, cumNo, cumWith, cumWithGains, shortTermGains, longTermGains } = series;
  // const { threshold = 250000 } = opts; // optional, not needed in Option A

   // Safety logs
  console.log('📊 [Chart] Rendering series:', series);
  console.log('📊 shortTermGains:', shortTermGains, 'longTermGains:', longTermGains);
  console.log('📊 ctx exists?', !!ctx);

  if (taxesChart) taxesChart.destroy();

  // --- helper: compute dynamic axis values before chart config ---
  const startAge = years[0];
  const endAge   = years[years.length - 1];
  const domain   = endAge - startAge;
  const step     = domain > 0 ? Math.max(1, Math.round(domain / 6)) : 5; // ~7 labels

  const insideTitlePlugin = {
  id: 'insideTitle',
  afterDraw(chart) {
    const { ctx, chartArea: area } = chart;
    if (!area) return;

    const title = 'Taxes Over Lifetime';
    const xCenter = (area.left + area.right) / 2;
    const yPixel = area.top + 30;   // 30px below the top of chart area

    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.font = 'bold 16px system-ui, -apple-system, BlinkMacSystemFont, sans-serif';

    // optional faint background
    const padX = 8, padY = 4;
    const metrics = ctx.measureText(title);
    const textW = metrics.width;
    const textH = 16;
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.fillRect(xCenter - textW / 2 - padX, yPixel - padY, textW + 2 * padX, textH + 2 * padY);

    ctx.fillStyle = 'rgba(0,0,0,0.85)';
    ctx.fillText(title, xCenter, yPixel);
    ctx.restore();
  }
};

  // Build datasets first
const datasets = [
  {
    label: 'With Roth Conversion',
    data: cumWith,
    borderColor: 'rgba(37,99,235,1)',
    fill: false,
    tension: 0.2,
    pointRadius: 0,
  },
  {
    label: 'No Roth Conversion',
    data: cumNo,
    borderColor: 'rgba(148,163,184,1)',
    fill: false,
    tension: 0.2,
    pointRadius: 0,
  }
];

const sim = {
  shortTermGains: shortTermGains || 0,
  longTermGains: longTermGains || 0
};

// Conditionally add orange line
if (sim.shortTermGains > 0 || sim.longTermGains > 0) {
  datasets.push({
    label: 'With Roth + Cap Gains',
    data: cumWithGains,
    borderColor: 'rgba(255,165,0,1)',
    borderDash: [6, 4],
    fill: false,
    tension: 0.2,
    pointRadius: 0,
  });
}

// Chart config
taxesChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: years,
    datasets: datasets
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: { display: true },
      tooltip: {
        callbacks: {
          title: (items) => `Age ${items[0].label}`,
          label: (ctx) => {
            const val = Math.round(ctx.parsed.y);
            return `${ctx.dataset.label}: $${val.toLocaleString('en-US')}`;
          }
        }
      }
    },
      scales: {
        x: {
          // 👇 treat x as numeric age values; use dynamic min/max
          type: 'linear',
          min: startAge,
          max: endAge,
          ticks: {
            stepSize: step,
            callback: (value) => `${Math.round(value)}` // 55, 60, 65, ...
          },
          grid: { color: 'rgba(203,213,225,0.2)' }
        },
        y: {
          ticks: {
            callback: (value) => {
              const v = Number(value);
              if (!Number.isFinite(v)) return '';
              if (Math.abs(v) >= 1_000_000) return `$${Math.round(v / 1_000_000)}M`;
              if (Math.abs(v) >= 1_000)     return `$${Math.round(v / 1_000)}k`;
              return `$${v}`;
            }
          },
          grid: { color: 'rgba(203,213,225,0.3)' }
        }
      }
    },
  plugins: [insideTitlePlugin] 
  });
}

// ------- Bracket bar helpers -------
const VISIBLE_PCTS = [10, 12, 22, 24, 32]; // show exactly these
let bar, tip, cells = [];

function buildBar() {
  bar = document.getElementById('bracketBar');
  tip = document.getElementById('brkTip');
  if (!bar || cells.length) return; // build once
  VISIBLE_PCTS.forEach((pct) => {
    const cell = document.createElement('div');
    cell.className = 'brk';
    cell.dataset.pct = String(pct);
    cell.textContent = `${pct}%`;
    bar.appendChild(cell);
    cells.push(cell);
  });
}

function highlightBracket(currentPct) {
  if (!cells.length) return;

  // clear
  cells.forEach(c => c.classList.remove('active'));

  // exact match or nearest lower
  let target = cells.find(c => Number(c.dataset.pct) === Number(currentPct));
  if (!target) {
    const pcts = cells.map(c => Number(c.dataset.pct));
    const lower = pcts.filter(p => p <= currentPct).sort((a,b)=>b-a)[0] ?? pcts[0];
    target = cells.find(c => Number(c.dataset.pct) === lower);
  }
  if (!target) return;

  target.classList.add('active');

  // center the bubble over active cell
  const rect = target.getBoundingClientRect();
  const parent = bar.getBoundingClientRect();
  const centerX = rect.left - parent.left + rect.width / 2;
  tip.style.left = `${centerX}px`;
  tip.style.display = 'block';
}

// ----------------------------------------------------------------------------
// init: build AGI select, wire listeners, first render
// ----------------------------------------------------------------------------
export function initClient() {
  const agiEl = document.getElementById('agiInput');
  const debouncedShow = debounce(showBracket, 120);
  buildBar();

  // Build AGI dropdown options in $1,000 steps (0 .. 500k) if empty
  if (agiEl && agiEl.tagName === 'SELECT' && agiEl.options.length === 0) {
    const max = 500_000;
    const step = 1_000;
    for (let v = 0; v <= max; v += step) {
      const opt = document.createElement('option');
      opt.value = String(v);
      opt.textContent = v.toLocaleString('en-US');
      agiEl.appendChild(opt);
    }
    agiEl.value = '60000'; // default AGI
  }

  // NEW: Build Age dropdown (default 55–90)
  const ageEl = document.getElementById('ageInput');
  if (ageEl && ageEl.tagName === 'SELECT' && ageEl.options.length === 0) {
    const minAge = 25;
    const maxAge = 100;
    for (let v = minAge; v <= maxAge; v++) {
      const opt = document.createElement('option');
      opt.value = String(v);
      opt.textContent = String(v);
      ageEl.appendChild(opt);
    }
  ageEl.value = '55'; // default age
  }

// === Populate Short/Long gains selects and wire listeners ===
const shortSel = document.getElementById('shortTermGains');
const longSel  = document.getElementById('longTermGains');

function fillGainsSelect(sel, max = 200_000, step = 5_000) {
  if (!(sel && sel.tagName === 'SELECT' && sel.options.length === 0)) return;
  // 0, 5k, 10k, ... max
  for (let v = 0; v <= max; v += step) {
    const opt = document.createElement('option');
    opt.value = String(v);
    // show $0, $5,000, $10,000...
    opt.textContent = v.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
    sel.appendChild(opt);
  }
  sel.value = '0';  // default
}

// Fill once
fillGainsSelect(shortSel);
fillGainsSelect(longSel);

// Listen for changes – update appState and re-render
if (shortSel) {
  shortSel.addEventListener('change', () => {
    const val = Number(shortSel.value) || 0;
    appState.sim.shortTermGains = val;

    // Delay to ensure reflow + chart repaint
    setTimeout(showBracket, 50);          // re-render headline + chart
  });
}
if (longSel) {
  longSel.addEventListener('change', () => {
    const val = Number(longSel.value) || 0;
    appState.sim.longTermGains = val;

    // Delay to ensure reflow + chart repaint
    setTimeout(showBracket, 50);
  });
}


  // Recompute when user picks a new AGI amount
  if (agiEl) {
  agiEl.addEventListener('change', () => {
    debouncedShow();
  });
}

// Filing status change
document.getElementById('filingStatus')
  ?.addEventListener('change', showBracket);

// Age: sync default to appState before first render, then watch changes
if (ageEl) {
  const initialAge = Number(ageEl.value);
  if (Number.isFinite(initialAge)) {
    appState.sim.ageNow = initialAge;  // sync before first render
  }

  ageEl.addEventListener('change', () => {
    const val = Number(ageEl.value);
    if (Number.isFinite(val)) {
      appState.sim.ageNow = val;
      showBracket();
    }
  });

  // === Capital Gains UI (new) ===
const btnSt = document.getElementById('btn-st-gain');
const btnLt = document.getElementById('btn-lt-gain');
const stWrap = document.getElementById('stGainInputWrap');
const ltWrap = document.getElementById('ltGainInputWrap');

btnSt?.addEventListener('click', () => {
  stWrap.style.display = stWrap.style.display === 'none' ? 'block' : 'none';
});
btnLt?.addEventListener('click', () => {
  ltWrap.style.display = ltWrap.style.display === 'none' ? 'block' : 'none';
});

}
}

// First render (call the real renderer once)
requestAnimationFrame(() => showBracket());

// ----------------------------------------------------------------------------
// helpers
// ----------------------------------------------------------------------------
function getAGINumber() {
  const el = document.getElementById('agiInput');
  return el ? Number(el.value) || 0 : 0;
}

function fmt(n) { return (n ?? 0).toLocaleString('en-US'); }

// ----------------------------------------------------------------------------
// main render
// ----------------------------------------------------------------------------
function showBracket() {
  // 🚦 prevent re-entry from DOM updates or chart scheduling
  if (isRendering || isChartUpdating) return;
  isRendering = true;
  try {
    const agi = getAGINumber();
    const status = document.getElementById('filingStatus')?.value || 'single';

    // compute bracket once
    const effectiveAGI = agi + appState.sim.shortTermGains;
    const res = calcBracket(effectiveAGI, status);

    // --- Tax summary card ---
    document.getElementById('bc-line1').textContent =
      `You’re in the ${res.ratePct}% marginal bracket.`;
    document.getElementById('bc-line2').textContent =
      `Income range for this bracket: $${fmt(res.rangeMin)} – $${fmt(res.rangeMax)}`;
    document.getElementById('bc-line3').textContent =
      `Room left before next bracket: $${fmt(res.roomLeft)}`;

    // --- bracket bar highlight ---
    highlightBracket(Number(res.ratePct));

    // --- room (robust) ---
    const roomFromInfo = Number(res.roomLeft);
    const roomFallback = Math.max(0, Number(res.rangeMax) - agi);
    const room = Number.isFinite(roomFromInfo) && roomFromInfo > 0 ? roomFromInfo : roomFallback;

    // --- Single params object for BOTH card + chart ---
    const params = {
      ...getSimDefaults(),        // base defaults
      ...appState.sim,            // UI overrides (ageNow, ageEnd, etc)
      shortTermGains: appState.sim.shortTermGains || 0,
      longTermGains:  appState.sim.longTermGains  || 0,
      convertNow: room,
      currRate: Number(res.ratePct) / 100,
      agi,
      status
    };

    // --- Headline (big blue number) from SAME series as chart ---
    const seriesForCard = getTaxesSeriesCached(params);
    const last = seriesForCard.years.length - 1;
    const lifetimeSavings = Math.max(
      0,
      (seriesForCard.cumNo?.[last] ?? 0) - (seriesForCard.cumWith?.[last] ?? 0)
    );
    const convertSavEl = document.getElementById('convertSavings');
    if (convertSavEl) {
      convertSavEl.textContent = `$${Math.round(lifetimeSavings).toLocaleString('en-US')}`;
    }

    // --- Chart update (guarded to avoid recursion) ---
    if (!isChartUpdating) {
      isChartUpdating = true;
      scheduleChartUpdate(params);
      isChartUpdating = false;
    }

    // --- Friendly copy in the convert card ---
    const line1 = document.querySelector('.convert-line1');
    const line2 = document.querySelector('.convert-line2');
    if (line1 && line2) {
      if (room <= 0) {
        line1.textContent = 'No room left in your current bracket.';
        line2.textContent = 'Additional conversion would occur at the next bracket rate.';
      } else {
        // keep existing span; do not rewrite the whole line
        line1.innerHTML = `You can convert <span id="convertAmount">$${room.toLocaleString('en-US')}</span>`;
        line2.textContent = 'and save an estimated';
      }
    }
  } finally {
    isRendering = false;
  }
}

// ----------------------------------------------------------------------------
// debounce helper
// ----------------------------------------------------------------------------
function debounce(fn, ms) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
}