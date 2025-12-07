"use client";

import AppShell from "../components/layout/AppShell";

export default function PrivacyPage() {
  return (
    <AppShell>
      <div className="space-y-8 py-8">
        <h1 className="text-3xl font-bold">Privacy Policy</h1>

        <div className="prose prose-sm max-w-none text-gray-800">

          <p><strong>Below are production-grade, legally safe, regulator-friendly documents tailored precisely for RothMax:</strong></p>

          <ul>
            <li>✔️ Consumer educational tax simulator</li>
            <li>✔️ No accounts, no data storage</li>
            <li>✔️ U.S. user base</li>
            <li>✔️ Disclaimer-heavy, IRS-neutral</li>
            <li>✔️ GDPR-safe by design (no data collection)</li>
          </ul>

          <p>This Privacy Policy is ready to paste into your /privacy page exactly as-is.</p>

          <hr />

          <h2>📘 PRIVACY POLICY — RothMax.ai</h2>
          <p><strong>Effective Date: January 1, 2025</strong></p>

          <h3>1. Summary</h3>
          <p>
            RothMax.ai is designed to avoid collecting personal data. This Policy
            explains what we do not collect and how data is processed locally.
          </p>

          <h3>2. No Data Collection</h3>
          <p>RothMax.ai does NOT collect:</p>
          <ul>
            <li>Names, addresses, SSNs</li>
            <li>Account numbers</li>
            <li>IP addresses</li>
            <li>Cookies or trackers</li>
            <li>Uploaded documents</li>
            <li>Analytics data</li>
          </ul>

          <h3>3. No Accounts. No Servers. No Tracking.</h3>
          <p>We do not create accounts or store any user inputs.</p>

          <h3>4. Local-Only Calculations</h3>
          <p>All calculations occur in your browser; nothing is transmitted to servers.</p>

          <h3>5. Voluntary Exports</h3>
          <p>
            If you export a JSON/PDF file, you are responsible for its storage and
            security.
          </p>

          <h3>6. Cookies</h3>
          <p>No analytics cookies. Only minimal UI preferences, if any.</p>

          <h3>7. Children’s Privacy</h3>
          <p>RothMax is not intended for anyone under 18.</p>

          <h3>8. GDPR Notes</h3>
          <p>
            RothMax does not process personal data. GDPR rights apply only to
            voluntarily submitted emails.
          </p>

          <h3>9. CCPA Notes</h3>
          <p>
            RothMax does not sell or share personal information. CCPA deletion and
            opt-out requests do not apply.
          </p>

          <h3>10. Changes</h3>
          <p>We may update this policy periodically.</p>

          <h3>11. Contact</h3>
          <p>📩 clay at rothmax dot ai</p>

          <hr />
          <p><strong>📄 END OF PRIVACY POLICY</strong></p>

        </div>
      </div>
    </AppShell>
  );
}