// src/components/HeaderInputField.tsx

interface HeaderInputFieldProps {
  label: string;
  value: number | string;
  type?: "number" | "text";
  onChange: (value: number | string) => void;
}

export default function HeaderInputField({
  label,
  value,
  type = "number",
  onChange,
}: HeaderInputFieldProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", marginRight: 16 }}>
      <label style={{ fontSize: 13, marginBottom: 4 }}>{label}</label>
      <input
        style={{
          padding: "6px 8px",
          border: "1px solid #ccc",
          borderRadius: 6,
          width: 130,
        }}
        type={type}
        value={value}
        onChange={(e) => {
          const raw = e.target.value;
          onChange(type === "number" ? Number(raw) : raw);
        }}
      />
    </div>
  );
}