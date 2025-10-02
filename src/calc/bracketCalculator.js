
// 2025 IRS Tax Brackets

const brackets_single = [
  { min: 0, max: 11925, rate: 0.10 },
  { min: 11926, max: 48475, rate: 0.12 },
  { min: 48476, max: 103350, rate: 0.22 },
  { min: 103351, max: 197300, rate: 0.24 },
  { min: 197301, max: 250525, rate: 0.32 },
  { min: 250526, max: 626350, rate: 0.35 },
  { min: 626351, max: Infinity, rate: 0.37 }
];

const brackets_mfj = [
  { min: 0, max: 23850, rate: 0.10 },
  { min: 23851, max: 96950, rate: 0.12 },
  { min: 96951, max: 206700, rate: 0.22 },
  { min: 206701, max: 394600, rate: 0.24 },
  { min: 394601, max: 501050, rate: 0.32 },
  { min: 501051, max: 751600, rate: 0.35 },
  { min: 751601, max: Infinity, rate: 0.37 }
];

const brackets_mfs = [
  { min: 0, max: 11925, rate: 0.10 },
  { min: 11926, max: 48475, rate: 0.12 },
  { min: 48476, max: 103350, rate: 0.22 },
  { min: 103351, max: 197300, rate: 0.24 },
  { min: 197301, max: 250525, rate: 0.32 },
  { min: 250526, max: 375800, rate: 0.35 },
  { min: 375801, max: Infinity, rate: 0.37 }
];

const brackets_hoh = [
  { min: 0, max: 17000, rate: 0.10 },
  { min: 17001, max: 64850, rate: 0.12 },
  { min: 64851, max: 103350, rate: 0.22 },
  { min: 103351, max: 197300, rate: 0.24 },
  { min: 197301, max: 250500, rate: 0.32 },
  { min: 250501, max: 626350, rate: 0.35 },
  { min: 626351, max: Infinity, rate: 0.37 }
];

const brackets_qw = [
  { min: 0, max: 23850, rate: 0.10 },
  { min: 23851, max: 96950, rate: 0.12 },
  { min: 96951, max: 206700, rate: 0.22 },
  { min: 206701, max: 394600, rate: 0.24 },
  { min: 394601, max: 501050, rate: 0.32 },
  { min: 501051, max: 751600, rate: 0.35 },
  { min: 751601, max: Infinity, rate: 0.37 }
];
function getBracketInfo(agi, status) {
  let selectedBrackets;

  // Choose bracket set based on filing status
  if (status === "single") selectedBrackets = brackets_single;
  else if (status === "mfj") selectedBrackets = brackets_mfj;
  else if (status === "mfs") selectedBrackets = brackets_mfs;
  else if (status === "hoh") selectedBrackets = brackets_hoh;
  else if (status === "qw") selectedBrackets = brackets_qw;
  else selectedBrackets = brackets_single; // default fallback

  for (const bracket of selectedBrackets) {
    if (agi >= bracket.min && agi <= bracket.max) {
    return {
      rate: bracket.rate,
      // ✅ provide numeric fields for consumers
      min: bracket.min,
      max: bracket.max,
      // keep a display string if you want it in the UI
      range: `$${bracket.min.toLocaleString()} - $${bracket.max.toLocaleString()}`,
      Left: bracket.max === Infinity ? 0 : Math.max(0, bracket.max - agi)
      };
    }
  }
}
// Wrap getBracketInfo into a clean API for the UI
export function calcBracket(agi, status) {
  const nAgi = Number(agi);
  if (!Number.isFinite(nAgi)) {
    return { ratePct: 0, rangeMin: 0, rangeMax: 0, roomLeft: 0 };
  }

  const info = getBracketInfo(nAgi, status);
  if (!info) { return { ratePct: 0, rangeMin: 0, rangeMax: 0, roomLeft: 0 }; }

  // ✅ use numeric fields directly (no string split/parsing)
  const rMin = Number(info.min) || 0;
  const rMax = Number(info.max) || 0;

return {
  ratePct: (info.rate || 0) * 100,
  rangeMin: rMin,
  rangeMax: rMax,
  roomLeft: Math.max(0, info.Left ?? (rMax - nAgi))
};
}
export {
  brackets_single,
  brackets_mfj,
  brackets_mfs,
  brackets_hoh,
  brackets_qw,
  getBracketInfo
};
// Only run this in Node (for testing outside the browser)
if (typeof window === 'undefined') {
  const agi = parseFloat(process.argv[2]);

  console.log("Single:", getBracketInfo(agi, "single"));
  console.log("MFJ:", getBracketInfo(agi, "mfj"));
  console.log("MFS:", getBracketInfo(agi, "mfs"));
  console.log("HoH:", getBracketInfo(agi, "hoh"));
  console.log("Qual.Wid.:", getBracketInfo(agi, "qw"));
}