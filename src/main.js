import './style.css'
import { initClient } from './ui/bracketCalculatorClient.js'

document.querySelector('#app').innerHTML = `
  <div class="wrap">
    <div class="brand">RothMax</div>
    <div class="brand">SIMULATION ONLY. NOT TAX ADVICE.</div>

  <div class="field">
   <div class="label">AGI</div>
   <select id="agiInput" class="control">
     <!-- options will be injected by JS -->
   </select>
  </div>

    <div class="field">
      <div class="label">Filing Status</div>
      <select id="filingStatus" class="control">
        <option value="single">Single</option>
        <option value="mfj">Married Filing Jointly</option>
        <option value="mfs">Married Filing Separately</option>
        <option value="hoh">Head of Household</option>
        <option value="qw">Qualifying Widow(er)</option>
      </select>
    </div>
    
    <!-- Age Now -->
    <div class="field">
      <div class="label">Age</div>
      <select id="ageInput" class="control"></select>
    </div>

    <!-- Bracket bar -->
<div class="bar-wrap">
  <div id="brkTip" class="tip">You are here</div>
  <div id="bracketBar" class="bracket-bar"></div>
</div>

<!-- Convert message card -->
<div id="convertCard" class="convert-card" aria-live="polite">
  <div class="convert-line1">
    You can convert <span id="convertAmount">$0</span> into a Roth this year
  </div>
  <div class="convert-line2">and save an estimated</div>
  <div class="convert-savings" id="convertSavings">$0</div>
  <div class="convert-sub">in lifetime taxes</div>
</div>

<!-- Taxes Over Lifetime -->
<section class="wrap" style="margin-top:8px;">
  <div class="chart-wrap">
    <canvas id="taxesLifetimeChart"></canvas>
  </div>
</section>

<section class="wrap gains-card">  <!-- give it a class; remove long inline style -->
  <h4 class="cap-gains-headline">Planning to sell stock or property this year?</h4>
  <p class="cap-gains-subhead">Add it here to see the impact:</p>

  <!-- BOTH inputs inside the SAME flex row -->
  <div class="cap-gains-row">       <!-- ← closed quote -->
    <div class="cap-gains-item">
      <div class="label">Short-term gains (taxed as income)</div>
      <select id="shortTermGains" class="control"></select>
    </div>
    <div class="cap-gains-item">
      <div class="label">Long-term gains (0% / 15% / 20%)</div>
      <select id="longTermGains" class="control"></select>
    </div>
  </div>
</section>

<!-- Placeholder for results (must be OUTSIDE the blue section) -->
<div class="card">
  <h3>Your Tax Bracket</h3>
  <p id="bc-line1"></p>
  <p id="bc-line2"></p>
  <p id="bc-line3"></p>
</div>

<div class="card assumptions-card" id="assumptions-card">
  <h3>Assumptions</h3>
  <div class="card-body">
  <p>Starting IRA: $400,000</p>
  <p>Growth rate: 6.0%</p>
  <p>Inflation: 2.2%</p>
  <p>Tax rate drift: +1.0% every 5 years</p>
  <p>RMD drift: +0.10% per year</p>
  <p>Roth conversion starts at input age</p>
  <p>Life expectancy: Age 90</p>
</div>
</div> <!-- closing assumptions card -->

  <p class="disclaimer-banner bottom-banner">
    SIMULATION ONLY. NOT TAX ADVICE.
  </p>

  <div class="footer-links">
  <a href="/terms">Terms of Use</a> • <a href="/privacy">Privacy Policy</a>
</div>
`;

initClient()