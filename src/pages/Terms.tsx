"use client";

import AppShell from "../components/layout/AppShell";

export default function TermsPage() {
  return (
    <AppShell>
      <div className="space-y-8 py-8">
        <h1 className="text-3xl font-bold">Terms of Use</h1>

        {/* Your full legal text wrapped in Tailwind Typography */}
        <div className="prose prose-sm max-w-none text-gray-800">

          <p><strong>Below are production-grade, legally safe, regulator-friendly documents tailored precisely for RothMax:</strong></p>

          <ul>
            <li>✔️ Consumer educational tax simulator</li>
            <li>✔️ No accounts, no data storage</li>
            <li>✔️ U.S. user base</li>
            <li>✔️ Disclaimer-heavy, IRS-neutral</li>
            <li>✔️ GDPR-safe by design (no data collection)</li>
          </ul>

          <p>These Terms are ready to paste into your /terms page exactly as-is.</p>

          <hr />

          <h2>📘 TERMS OF USE — RothMax.ai</h2>
          <p><strong>Effective Date: January 1, 2025</strong></p>

          <h3>1. Introduction</h3>
          <p>
            Welcome to RothMax.ai (“RothMax,” “we,” “our,” or “us”). RothMax is an
            educational retirement tax simulator designed to help users understand
            Roth conversions, Required Minimum Distributions (RMDs), Social Security
            taxation, and Medicare IRMAA interactions.
          </p>
          <p>
            By accessing or using RothMax.ai (the “Service”), you (“User,” “you,”
            “your”) agree to be bound by these Terms of Use (“Terms”). If you do not
            agree, you must not use the Service.
          </p>
          <p>RothMax is not a financial institution, tax advisor, broker-dealer, investment advisor, or law firm.</p>

          <h3>2. Not Tax, Legal, or Investment Advice</h3>
          <p><strong>⚠️ RothMax is an educational simulation only.</strong> It does NOT:</p>
          <ul>
            <li>Provide tax, legal, or investment advice</li>
            <li>Prepare or file tax returns</li>
            <li>Predict future tax outcomes</li>
            <li>Offer personalized financial recommendations</li>
            <li>Guarantee accuracy or applicability to your personal situation</li>
          </ul>

          <p>All outputs are hypothetical and approximate.</p>

          <h3>3. No Client Relationship</h3>
          <p>Using RothMax does not create:</p>
          <ul>
            <li>A tax advisor–client relationship</li>
            <li>A fiduciary relationship</li>
            <li>A professional engagement</li>
          </ul>

          <h3>4. Eligibility</h3>
          <p>To use RothMax.ai, you must be at least 18 years old.</p>

          <h3>5. User Responsibilities</h3>
          <ul>
            <li>Provide accurate input values</li>
            <li>Not rely solely on RothMax for financial decisions</li>
            <li>Not circumvent tax laws</li>
            <li>Not reverse-engineer or redistribute the Service</li>
          </ul>

          <h3>6. No Data Storage / No Accounts</h3>
          <p>RothMax uses client-side calculations only. We do NOT:</p>
          <ul>
            <li>Create user accounts</li>
            <li>Store personal data</li>
            <li>Track identifiable information</li>
            <li>Save your inputs on servers</li>
          </ul>

          <h3>7. Intellectual Property</h3>
          <p>
            All logos, design, calculations, layout, text, and code are protected by
            copyright.
          </p>

          <h3>8. Accuracy and Limitations</h3>
          <p>RothMax uses simplified federal rules including:</p>
          <ul>
            <li>2025 federal tax brackets</li>
            <li>IRS Pub 915 (Social Security)</li>
            <li>IRS Pub 590-B RMD tables</li>
            <li>Medicare IRMAA thresholds</li>
          </ul>

          <p>RothMax does NOT model state taxes, AMT, QBI, ACA subsidies, itemized deductions, credits, or advanced IRS rules.</p>

          <h3>9. Service Modifications</h3>
          <p>We may update or modify the Service at any time.</p>

          <h3>10. Limitation of Liability</h3>
          <p>
            RothMax and its creators are not liable for any loss or adverse outcome
            resulting from your use of the Service.
          </p>

          <h3>11. No Warranty</h3>
          <p>THE SERVICE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND.</p>

          <h3>12. Third-Party Links</h3>
          <p>References to IRS publications do not imply endorsement.</p>

          <h3>13. Governing Law</h3>
          <p>These Terms are governed by New York State and U.S. federal law.</p>

          <h3>14. Contact</h3>
          <p>📩 clay at rothmax dot ai</p>

          <hr />
          <p><strong>📄 END OF TERMS OF USE</strong></p>

        </div>
      </div>
    </AppShell>
  );
}