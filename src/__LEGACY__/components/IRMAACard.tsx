import type { FederalSummary } from "../engines/types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface IRMAACardProps {
  federal: FederalSummary;
}

interface IrmaaTier {
  label: string;
  upper: number;
  surcharge: number; // mock monthly surcharge amount
}

interface IrmaaPoint {
  tier: string;
  upper: number;
  surcharge: number;
}

// 2025-ish single-filer mock IRMAA tiers (these are placeholders)
const IRMAA_SINGLE_MOCK: IrmaaTier[] = [
  { label: "Standard", upper: 103000, surcharge: 0 },
  { label: "Tier 1", upper: 129000, surcharge: 70 },
  { label: "Tier 2", upper: 161000, surcharge: 175 },
  { label: "Tier 3", upper: 193000, surcharge: 280 },
  { label: "Tier 4", upper: 500000, surcharge: 400 },
];

function findIrmaaTier(magi: number): IrmaaTier {
  const tier =
    IRMAA_SINGLE_MOCK.find((t) => magi <= t.upper) ??
    IRMAA_SINGLE_MOCK[IRMAA_SINGLE_MOCK.length - 1];
  return tier;
}

function buildIrmaaChartData(): IrmaaPoint[] {
  return IRMAA_SINGLE_MOCK.map((t) => ({
    tier: t.label,
    upper: t.upper,
    surcharge: t.surcharge,
  }));
}

export default function IRMAACard({ federal }: IRMAACardProps) {
  // For now, treat taxable income as MAGI proxy
  const magi = federal.taxableIncome;
  const currentTier = findIrmaaTier(magi);
  const chartData = buildIrmaaChartData();

  const nextTierIndex =
    IRMAA_SINGLE_MOCK.findIndex((t) => t.label === currentTier.label) + 1;
  const nextTier =
    nextTierIndex < IRMAA_SINGLE_MOCK.length
      ? IRMAA_SINGLE_MOCK[nextTierIndex]
      : null;

  const dollarsToNextTier =
    nextTier && magi < nextTier.upper ? nextTier.upper - magi : null;

  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: 12,
        padding: 24,
        marginTop: 40,
        background: "#ffffff",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>
          Medicare IRMAA Exposure (Mock)
        </div>
        <div style={{ fontSize: 13, color: "#6b7280" }}>
          A mock view of how your income might interact with Medicare IRMAA
          tiers. Real IRMAA logic will be wired later.
        </div>
      </div>

      {/* Stat row */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 16,
          marginBottom: 20,
        }}
      >
        <IrmaaStatBox
          label="Current MAGI (mock)"
          value={`$${magi.toLocaleString()}`}
        />
        <IrmaaStatBox
          label="Current IRMAA Tier"
          value={currentTier.label}
        />
        <IrmaaStatBox
          label="Mock Monthly Surcharge"
          value={
            currentTier.surcharge > 0
              ? `$${currentTier.surcharge.toLocaleString()}/mo`
              : "Standard premium"
          }
        />
        <IrmaaStatBox
          label="Dollars to Next Tier"
          value={
            dollarsToNextTier !== null
              ? `$${dollarsToNextTier.toLocaleString()}`
              : "At top tier"
          }
        />
      </div>

      {/* Layout: bar chart + explanation */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1.4fr)",
          gap: 16,
        }}
      >
        {/* Left: IRMAA tiers chart */}
        <div
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: 10,
            padding: 16,
            background: "#f9fafb",
          }}
        >
          <div
            style={{
              fontSize: 14,
              fontWeight: 600,
              marginBottom: 8,
            }}
          >
            IRMAA Tiers (Mock Surcharges)
          </div>
          <div style={{ height: 220 }}>
            <ResponsiveContainer>
              <BarChart
                data={chartData}
                margin={{ top: 10, right: 16, left: 0, bottom: 0 }}
              >
                <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" />
                <XAxis dataKey="tier" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="surcharge" name="Monthly Surcharge" fill="#7C3AED" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: explanation + position indicator */}
        <div
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: 10,
            padding: 16,
            background: "#f9fafb",
          }}
        >
          <div
            style={{
              fontSize: 14,
              fontWeight: 600,
              marginBottom: 8,
            }}
          >
            Where You Sit (Mock)
          </div>
          <p style={{ fontSize: 13, color: "#4b5563", marginBottom: 12 }}>
            In this mock model, your MAGI puts you in the{" "}
            <strong>{currentTier.label}</strong> IRMAA tier. That means an
            estimated surcharge of{" "}
            <strong>
              {currentTier.surcharge > 0
                ? `$${currentTier.surcharge.toLocaleString()}/month`
                : "no extra IRMAA surcharge"}
            </strong>{" "}
            on top of the standard Medicare premium.
          </p>

          {dollarsToNextTier !== null ? (
            <p style={{ fontSize: 13, color: "#4b5563", marginBottom: 12 }}>
              You are about{" "}
              <strong>${dollarsToNextTier.toLocaleString()}</strong> below the
              next tier. Thoughtful Roth conversions or RMD planning can help
              keep you out of higher IRMAA brackets.
            </p>
          ) : (
            <p style={{ fontSize: 13, color: "#4b5563", marginBottom: 12 }}>
              You are at the top IRMAA tier in this mock view. Future planning
              would focus on managing long-term MAGI to reduce surcharges.
            </p>
          )}

          <div
            style={{
              marginTop: 8,
              fontSize: 12,
              color: "#6b7280",
            }}
          >
            This card uses placeholder thresholds and surcharges. In a later
            phase, we’ll plug in the real IRMAA tables by filing status and
            year.
          </div>
        </div>
      </div>
    </div>
  );
}

interface IrmaaStatBoxProps {
  label: string;
  value: string;
}

function IrmaaStatBox({ label, value }: IrmaaStatBoxProps) {
  return (
    <div
      style={{
        flex: "1 1 150px",
        padding: 12,
        borderRadius: 10,
        border: "1px solid #e5e7eb",
        background: "#f9fafb",
      }}
    >
      <div
        style={{
          fontSize: 11,
          textTransform: "uppercase",
          letterSpacing: "0.04em",
          color: "#6b7280",
          marginBottom: 4,
        }}
      >
        {label}
      </div>
      <div style={{ fontSize: 16, fontWeight: 600, color: "#111827" }}>
        {value}
      </div>
    </div>
  );
}