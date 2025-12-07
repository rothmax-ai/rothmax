"use client";

export interface ErrorBannerProps {
  message: string;        // Primary error message (required)
  details?: string;       // Optional supporting details
  className?: string;     // Layout override for parent context
}

/**
 * ErrorBanner — Standardized UI alert for validation or calculation errors.
 *
 * Architectural rules:
 *  • Pure presentational component
 *  • Contains NO tax logic, NO normalization, NO state, NO DomainInput handling
 *  • Receives fully prepared error text only
 *  • Must be used for all error display in Cards, Drawers, Charts, and Pages
 *
 * Responsibilities:
 *  • Show a consistent, professional error block
 *  • Provide strong visual contrast (red alert)
 *  • Accessible with role="alert"
 *  • Works in any layout (Card, Drawer, standalone, grid, etc.)
 */
export default function ErrorBanner({
  message,
  details,
  className = "",
}: ErrorBannerProps) {
  return (
    <div
      role="alert"
      className={`
        bg-red-50 border border-red-300 text-red-800 
        rounded-md px-4 py-3 text-sm
        ${className}
      `}
    >
      {/* MAIN MESSAGE */}
      <div className="font-semibold">{message}</div>

      {/* OPTIONAL DETAIL TEXT */}
      {details && (
        <div className="mt-1 text-red-700 text-xs">
          {details}
        </div>
      )}
    </div>
  );
}