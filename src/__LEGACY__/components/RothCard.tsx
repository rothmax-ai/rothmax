// src/components/RothCard.tsx

import type { FederalSummary } from "../engines/types";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface RothCardProps {
  federal: FederalSummary;
}

interface LifetimePoint {
  age: number;
  noRoth: number;
  withRoth: number;
}

// Temporary mock lifetime data generator.
// Later we’ll replace this with a real projection engine.
function buildMockLifetimeData(summary: FederalSummary): LifetimePoint[] {
  const base = summary.taxableIncome;
  const tax = summary.bracket.bracketRate * base;

  // Simple fake projection: taxes grow over time.
  const points: LifetimePoint[] = [];
  const startAge = 60;
  for (let i = 0; i <= 6; i++) {
    const age = startAge + i * 5;
    const noRoth = tax * (1 + 0.04 * i); // higher long-term tax
    const withRoth = tax * (1 + 0.03 * i); // slightly lower with Roth
    points.push({ age, noRoth, withRoth });
  }
  return points;
}

export default function RothCard({ federal }: RothCardProps) {
  const { taxableIncome, bracket } = federal;

  const marginalPercent = (bracket.bracketRate * 100).toFixed(0);
  const bracketLower = bracket.bracketLower;
  const bracketUpperLabel =
    bracket.bracketUpper === Infinity
      ? "∞"
      : `$${bracket.bracketUpper.toLocaleString()}`;
  const roomLeft = bracket.roomLeft;

  const lifetimeData = buildMockLifetimeData(federal);

  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: 12,
        padding: 24,
        marginBottom: 24,
        background: "#ffffff",
      }}
    >
      {/* Hero banner */}
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>
          Optimize Your Tax Bracket Strategy
        </div>
        <div style={{ fontSize: 13, color: "#6b7280" }}>
          Explore how your current bracket and taxable income affect your
          long-term taxes.
        </div>
      </div>

      {/* Key numbers row */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 16,
          marginBottom: 24,
        }}
      >
        <SummaryBox
          label="Taxable Income"
          value={`$${taxableIncome.toLocaleString()}`}
        />
        <SummaryBox
          label="Marginal Bracket"
          value={`${marginalPercent}%`}
        />
        <SummaryBox
          label="Bracket Range"
          value={`$${bracketLower.toLocaleString()} – ${bracketUpperLabel}`}
        />
        <SummaryBox
          label="Room Left in Bracket"
          value={`$${roomLeft.toLocaleString()}`}
        />
      </div>

      {/* Chart + Bracket panel */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1.4fr)",
          gap: 16,
        }}
      >
        {/* Left: Lifetime chart */}
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
            Taxes Over Lifetime (mock projection)
          </div>
          <div style={{ height: 220 }}>
            <ResponsiveContainer>
              <LineChart
                data={lifetimeData}
                margin={{ top: 10, right: 16, left: 0, bottom: 0 }}
              >
                <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" />
                <XAxis dataKey="age" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend verticalAlign="top" height={24} />
                <Line
                  type="monotone"
                  dataKey="noRoth"
                  name="Without Roth"
                  stroke="#9CA3AF"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="withRoth"
                  name="With Roth (mock)"
                  stroke="#7C3AED"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Bracket / room visualization */}
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
            Current Year Bracket Position
          </div>
          <div style={{ fontSize: 13, color: "#4b5563", marginBottom: 12 }}>
            You are in the <strong>{marginalPercent}%</strong> marginal
            bracket. You have{" "}
            <strong>${roomLeft.toLocaleString()}</strong> of room left before
            moving up to the next bracket.
          </div>

          <div
            style={{
              height: 140,
              borderRadius: 8,
              border: "1px solid #e5e7eb",
              display: "flex",
              flexDirection: "column-reverse",
              overflow: "hidden",
              background: "#f3f4f6",
            }}
          >
            {/* Filled portion */}
            <div
              style={{
                height: `${Math.min(
                  100,
                  (taxableIncome / (bracket.bracketUpper === Infinity ? taxableIncome + roomLeft : bracket.bracketUpper)) *
                    100
                )}%`,
                background: "#7C3AED",
                transition: "height 0.2s ease",
              }}
            />

            {/* Unfilled portion */}
            <div
              style={{
                flex: 1,
                background:
                  "linear-gradient(to top, rgba(156,163,175,0.25), transparent)",
              }}
            />
          </div>

          <div
            style={{
              marginTop: 8,
              fontSize: 12,
              color: "#6b7280",
            }}
          >
            Filled area shows how much of your current bracket is used by your
            taxable income. The remaining space is potential room for Roth
            conversions or additional income at this rate.
          </div>
        </div>
      </div>
    </div>
  );
}

interface SummaryBoxProps {
  label: string;
  value: string;
}

function SummaryBox({ label, value }: SummaryBoxProps) {
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