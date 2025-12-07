// src/utils/dateHelpers.ts
/**
 * Centralized date + age helpers for RothMax / NotTaxAdvice.ai
 * ------------------------------------------------------------
 * MUST remain pure, deterministic, and IRS-aligned.
 *
 * Responsibilities:
 *  - Safe DOB parsing
 *  - Age calculation (full year method)
 *  - Current year abstraction (mockable)
 *  - Future-year helpers for projections
 *
 * Must NOT:
 *  - Perform tax logic
 *  - Access UI or state
 *  - Format dates
 *  - Throw exceptions on invalid DOB
 */
// ------------------------------------------------------------
// 1. getCurrentYear()
// ------------------------------------------------------------
export function getCurrentYear() {
    // Isolated for testability and mocking.
    return new Date().getFullYear();
}
// ------------------------------------------------------------
// 2. parseDOB(input)
// ------------------------------------------------------------
/**
 * Safely parse a DOB string in "YYYY-MM-DD" format.
 * Returns:
 *   Date object   → if valid
 *   null          → if empty or invalid
 */
export function parseDOB(input) {
    if (!input || typeof input !== "string")
        return null;
    // Only accept YYYY-MM-DD
    const isoPattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!isoPattern.test(input))
        return null;
    // Construct Date in UTC to avoid local timezone drift
    const date = new Date(input + "T00:00:00Z");
    // Invalid date check
    if (isNaN(date.getTime()))
        return null;
    return date;
}
// ------------------------------------------------------------
// 3. calculateAge(dob)
// ------------------------------------------------------------
/**
 * Returns integer age as of today.
 * Uses IRS-aligned "birthday has occurred this year?" logic.
 * If dob is invalid → returns NaN (derive.ts handles fallback).
 */
export function calculateAge(dob) {
    const now = new Date();
    let age = now.getUTCFullYear() - dob.getUTCFullYear();
    const monthDiff = now.getUTCMonth() - dob.getUTCMonth();
    const dayDiff = now.getUTCDate() - dob.getUTCDate();
    // If birthday has not happened yet this year
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age -= 1;
    }
    return age;
}
// ------------------------------------------------------------
// 4. addYears(date, years)
// ------------------------------------------------------------
/**
 * Returns a new Date object offset by a number of FULL calendar years.
 * Critical for multi-year projections and RMD schedules.
 */
export function addYears(date, years) {
    const d = new Date(date);
    d.setUTCFullYear(d.getUTCFullYear() + years);
    return d;
}
// ------------------------------------------------------------
// 5. currentAgeOn(date, dob)
// ------------------------------------------------------------
/**
 * Computes age at a FUTURE date.
 * Used in:
 *   - projectMultiYear()
 *   - future-year RMD logic
 *   - IRMAA forward projections
 */
export function currentAgeOn(targetDate, dob) {
    let age = targetDate.getUTCFullYear() - dob.getUTCFullYear();
    const monthDiff = targetDate.getUTCMonth() - dob.getUTCMonth();
    const dayDiff = targetDate.getUTCDate() - dob.getUTCDate();
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age -= 1;
    }
    return age;
}
