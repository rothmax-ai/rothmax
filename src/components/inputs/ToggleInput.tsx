"use client";

/**
 * ToggleInputProps — canonical boolean input props
 * Matches the Uniform Input Props List exactly.
 */
export interface ToggleInputProps {
  label: string;                         // Display label
  value: boolean;                        // Controlled true/false
  onChange: (value: boolean) => void;    // Emits boolean
  description?: string;                  // Optional helper text
  error?: string;                        // UI-only error message
  disabled?: boolean;                    // Disabled state
  className?: string;                    // Layout override
}

/**
 * ToggleInput — canonical boolean toggle component.
 * Pure UI. Controlled. No logic. No coercion.
 */
export default function ToggleInput({
  label,
  value,
  onChange,
  description,
  error,
  disabled = false,
  className = "",
}: ToggleInputProps) {
  return (
    <div className={`flex flex-col space-y-1 ${className}`}>
      {/* LABEL */}
      <label className="text-sm font-medium text-gray-800">
        {label}
      </label>

      {/* TOGGLE + DESCRIPTION ROW */}
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.checked)}
          aria-invalid={!!error}
          aria-checked={value}
          className="
            h-4 w-4
            accent-blue-600
            rounded
            focus:ring-2 focus:ring-blue-500
            disabled:cursor-not-allowed disabled:opacity-60
          "
        />

        {/* Optional descriptive text */}
        {description && (
          <span className="text-sm text-gray-600">
            {description}
          </span>
        )}
      </div>

      {/* UI-ONLY ERROR MESSAGE */}
      {error && (
        <span className="text-xs text-red-600">
          {error}
        </span>
      )}
    </div>
  );
}