// src/state/derive.ts
// ==================================================
//  DERIVED VALUES LAYER
//  Computes all intermediate values the logic layer
//  requires (MAGI, AGI, combined income, age flags,
//  clean numeric conversions, helper ranges).
//
//  MUST:
//    • Use ONLY canonical derived values
//    • Contain NO UI logic
//    • Contain NO IRS thresholds
//    • Contain NO DomainInput
//    • Contain NO state mutations
//    • Be deterministic & pure
//
//  Pipeline: inputState → validation → derive → normalize → logic
// ==================================================
import { getCurrentYear, calculateAge, parseDOB } from "../utils/dateHelpers";
// -----------------------------------------------
// Numeric cleaners (canonical sanitize helpers)
// -----------------------------------------------
export function cleanNumber(n) {
    const v = Number(n);
    return isFinite(v) && !isNaN(v) && v >= 0 ? v : 0;
}
// -----------------------------------------------
// Derived numeric conversions
// These produce the canonical “cleanXXX” values.
// -----------------------------------------------
export function deriveCleanValues(raw) {
    return {
        cleanWages: cleanNumber(raw.wages),
        cleanInterest: cleanNumber(raw.interest),
        cleanDividends: cleanNumber(raw.dividends),
        cleanCapitalGains: cleanNumber(raw.capitalGains),
        cleanOtherIncome: cleanNumber(raw.otherIncome),
        cleanTaxExemptInterest: cleanNumber(raw.taxExemptInterest),
        cleanSocialSecurityAnnual: cleanNumber(raw.socialSecurityAnnual),
        cleanPensionIncome: cleanNumber(raw.pensionIncome),
        cleanIraBalance: cleanNumber(raw.iraBalance),
        cleanRothBalance: cleanNumber(raw.rothBalance),
        cleanTaxableBalance: cleanNumber(raw.taxableBalance),
        cleanRothConversionAmount: cleanNumber(raw.rothConversionAmount),
    };
}
// -----------------------------------------------
// Derived Ages
// -----------------------------------------------
export function deriveAges(raw) {
    const birth = parseDOB(raw.dob);
    const currentYear = getCurrentYear();
    // If DOB is valid → ageFromDob, else use raw.age
    const ageFromDob = birth ? calculateAge(birth) : raw.age;
    const isRmdAge = ageFromDob >= raw.rmdStartAge;
    const yearsUntilRmd = Math.max(0, raw.rmdStartAge - ageFromDob);
    return {
        ageFromDob,
        isRmdAge,
        yearsUntilRmd,
        birthYear: birth ? birth.getFullYear() : currentYear - raw.age,
        currentYear,
        currentAge: ageFromDob,
    };
}
// =============================================
// Derived Income Calculations
// =============================================
export function deriveIncome(clean) {
    const agi = clean.cleanWages +
        clean.cleanInterest +
        clean.cleanDividends +
        clean.cleanCapitalGains +
        clean.cleanOtherIncome +
        clean.cleanPensionIncome +
        clean.cleanRothConversionAmount; // SS handled separately
    // MAGI addbacks (RothMax MVP: only tax-exempt interest)
    const magi = agi + clean.cleanTaxExemptInterest;
    const combinedIncome = magi + 0.5 * clean.cleanSocialSecurityAnnual;
    return {
        agi,
        magi,
        combinedIncome,
    };
}
// ======================================
// LTCG stacking derived values
// Ordinary income BEFORE LTCG
// ======================================
export function deriveLTCGHelpers(raw, derived) {
    // Clean LT capital gains
    const cleanCapitalGains = Number(raw.capitalGains) || 0;
    // Ordinary taxable income EXCLUDING LTCG
    const ordinaryIncomeForLTGC = Math.max(0, derived.agi - cleanCapitalGains);
    return {
        ordinaryIncomeForLTGC,
    };
}
// -----------------------------------------------
// Filing helpers
// -----------------------------------------------
export function deriveFilingHelpers(raw) {
    const isMarriedFilingJointly = raw.filingStatus === "mfj";
    const effectiveFilingUnit = isMarriedFilingJointly ? 2 : 1;
    return {
        isMarriedFilingJointly,
        effectiveFilingUnit,
    };
}
// -----------------------------------------------
// Pension / Income flags
// -----------------------------------------------
export function deriveIncomeFlags(clean) {
    return {
        hasPensionIncome: clean.cleanPensionIncome > 0,
        incomePhaseouts: {}, // future AMT/QBI/ACA
    };
}
// -----------------------------------------------
// Combined derive() function for normalize.ts
// -----------------------------------------------
export function derive(raw) {
    const clean = deriveCleanValues(raw);
    const ages = deriveAges(raw);
    const filing = deriveFilingHelpers(raw);
    const income = deriveIncome(clean);
    const ltcg = deriveLTCGHelpers(raw, income);
    const flags = deriveIncomeFlags(clean);
    return {
        ...clean,
        ...ages,
        ...filing,
        ...income,
        ...ltcg,
        ...flags,
    };
}
