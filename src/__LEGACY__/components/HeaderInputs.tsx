// src/components/HeaderInputs.tsx
import React from "react";

// src/components/HeaderInputs.tsx
import type { Full1040Input } from "../types/inputExtended";
import type { FilingStatus } from "../engines/types";

import HeaderInputField from "./HeaderInputField";

interface HeaderInputsProps {
  onChange: (state: Partial<Full1040Input>) => void;
}

const filingStatusOptions: FilingStatus[] = [
  "single",
  "marriedFilingJointly",
  "marriedFilingSeparately",
  "headOfHousehold",
];

export default function HeaderInputs({ onChange }: HeaderInputsProps) {
  const [input, setInput] = React.useState<Full1040Input>({} as Full1040Input);

  function update<K extends keyof Full1040Input>(key: K, value: Full1040Input[K]) {
    const next = { ...input, [key]: value };
    setInput(next);
    onChange(next);
  }

  return (
    <div style={{ padding: "20px", borderBottom: "1px solid #eee" }}>
      {/* AGI */}
      <HeaderInputField
        label="AGI"
        value={input.agi}
        onChange={(v) => update("agi", Number(v))}
      />

      {/* Filing Status */}
      <label style={{ fontSize: 13, marginBottom: 4 }}>Filing Status</label>
      <select
        style={{ padding: "6px 8px", marginBottom: 16 }}
        value={input.filingStatus}
        onChange={(e) =>
          update("filingStatus", e.target.value as FilingStatus)
        }
      >
        {filingStatusOptions.map((fs) => (
          <option key={fs} value={fs}>
            {fs}
          </option>
        ))}
      </select>

      {/* Age */}
      <HeaderInputField
        label="Age"
        value={input.age}
        onChange={(v) => update("age", Number(v))}
      />
    </div>
  );
}