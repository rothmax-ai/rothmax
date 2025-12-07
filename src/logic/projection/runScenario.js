// src/logic/projection/runScenario.ts
"use client";
import { getInflatedBrackets, getInflatedStandardDeduction, } from "./inflation";
import { calculateTaxableSS } from "../calculateTaxableSS";
import { calculateIRMAATier } from "../calculateIRMAA";
import { rmdTable2025 } from "../taxData/2025/rmd2025";
/*──────────────────────────────────────────────────────────────
  FEDERAL TAX — Progressive using inflated IRS table
──────────────────────────────────────────────────────────────*/
function computeFederalTax(taxableIncome, table) {
    let remaining = taxableIncome;
    let tax = 0;
    for (const row of table) {
        const lower = row.lower;
        const upper = row.upper === Infinity ? taxableIncome : row.upper;
        if (taxableIncome <= lower)
            break;
        const width = Math.min(remaining, upper - lower);
        if (width <= 0)
            continue;
        tax += width * row.rate;
        remaining -= width;
        if (remaining <= 0)
            break;
    }
    return Math.max(0, tax);
}
/*──────────────────────────────────────────────────────────────
  Marginal bracket lookup
──────────────────────────────────────────────────────────────*/
function computeMarginalFromTable(taxableIncome, table) {
    for (let i = 0; i < table.length; i++) {
        const row = table[i];
        if (taxableIncome >= row.lower && taxableIncome < row.upper) {
            return { marginalRate: row.rate, bracketIndex: i };
        }
    }
    const last = table[table.length - 1];
    return { marginalRate: last.rate, bracketIndex: table.length - 1 };
}
/*──────────────────────────────────────────────────────────────
  RMD from Uniform Lifetime Table
──────────────────────────────────────────────────────────────*/
function computeRMDForAge(age, iraBalance, rmdStartAge) {
    if (age < rmdStartAge || iraBalance <= 0)
        return 0;
    const divisor = rmdTable2025[age];
    return divisor ? iraBalance / divisor : 0;
}
/*──────────────────────────────────────────────────────────────
  MAIN PROJECTION LOOP
──────────────────────────────────────────────────────────────*/
export function runScenario(input) {
    const { filingStatus, currentAge, ssStartAge, rmdStartAge, retirementAge, lifeExpectancyAge, iraBalance: ira0, rothBalance: roth0, taxableBalance: taxable0, wages: baseWages, interest: baseInterest, taxExemptInterest, dividends: baseDividends, capitalGains: baseCapitalGains, pensionIncome: basePension, otherIncome: baseOther, socialSecurityAnnual: ss0, growthRate, taxableYieldRate, inflationRate, annualConversionPlan, applyIRMAA, } = input;
    const years = [];
    const startYear = new Date().getFullYear();
    // Running balances track each year's start → end
    let ira = ira0;
    let roth = roth0;
    let taxable = taxable0;
    let ssAnnual = ss0;
    for (let age = currentAge, yearIndex = 0; age <= lifeExpectancyAge; age++, yearIndex++) {
        const year = startYear + yearIndex;
        const working = age < retirementAge;
        const ssActive = age >= ssStartAge;
        /*──────────────────────────────────────────────
          START-OF-YEAR BALANCES (required for RMD logic)
        ──────────────────────────────────────────────*/
        const iraStart = ira;
        const rothStart = roth;
        const taxableStart = taxable;
        /*──────────────────────────────────────────────
          INCOME LAYERS
        ──────────────────────────────────────────────*/
        const wages = working ? baseWages : 0;
        const pension = basePension;
        const dividends = baseDividends;
        const capGains = baseCapitalGains;
        const other = baseOther;
        const interest = taxable * taxableYieldRate + baseInterest;
        const ssGross = ssActive ? ssAnnual : 0;
        const rmd = computeRMDForAge(age, iraStart, rmdStartAge);
        // Roth conversion — limited by remaining IRA after RMD
        let conversion = annualConversionPlan(yearIndex, age);
        const maxConvertible = Math.max(0, iraStart - rmd);
        if (conversion > maxConvertible)
            conversion = maxConvertible;
        /*──────────────────────────────────────────────
          UPDATE BALANCES BEFORE GROWTH
        ──────────────────────────────────────────────*/
        const iraAfterWithdrawals = Math.max(0, iraStart - rmd - conversion);
        const rothAfterConversion = rothStart + conversion;
        /*──────────────────────────────────────────────
          APPLY GROWTH
        ──────────────────────────────────────────────*/
        const iraEnd = iraAfterWithdrawals * (1 + growthRate);
        const rothEnd = rothAfterConversion * (1 + growthRate);
        const taxableEnd = taxableStart * (1 + growthRate);
        // Update running balances for next loop
        ira = iraEnd;
        roth = rothEnd;
        taxable = taxableEnd;
        /*──────────────────────────────────────────────
          AGI → MAGI → TAXABLE INCOME
        ──────────────────────────────────────────────*/
        const ordinaryIncome = wages + pension + rmd + conversion + interest + dividends + other;
        const ssTaxable = calculateTaxableSS({
            filingStatus,
            ordinaryIncome,
            socialSecurityGross: ssGross,
            taxExemptInterest,
        });
        const agiPreSS = ordinaryIncome + capGains;
        const agi = agiPreSS + ssTaxable;
        // Combined Income (SSR rules)
        const combinedIncome = agi + taxExemptInterest + 0.5 * ssGross;
        // MAGI channels
        const magiForIRMAA = agi + taxExemptInterest;
        const magiForSSTax = combinedIncome;
        /*──────────────────────────────────────────────
          IRS VALUES (inflated)
        ──────────────────────────────────────────────*/
        const bracketTable = getInflatedBrackets(filingStatus, yearIndex, inflationRate);
        const stdDeduction = getInflatedStandardDeduction(filingStatus, yearIndex, inflationRate);
        const taxableIncome = Math.max(0, agi - stdDeduction);
        const { marginalRate, bracketIndex } = computeMarginalFromTable(taxableIncome, bracketTable);
        const federalTax = computeFederalTax(taxableIncome, bracketTable);
        /*──────────────────────────────────────────────
          IRMAA TIER
        ──────────────────────────────────────────────*/
        let irmaaTier = 0;
        let irmaaSurchargeAnnual = 0;
        if (applyIRMAA) {
            const r = calculateIRMAATier({
                filingStatus,
                magi: magiForIRMAA,
                yearIndex,
                inflationRate,
            });
            irmaaTier = r.tier;
            irmaaSurchargeAnnual = r.surcharge;
        }
        /*──────────────────────────────────────────────
          SAVE YEAR ENTRY — NOW WITH START + END BALANCES
        ──────────────────────────────────────────────*/
        years.push({
            year,
            age,
            // NEW REQUIRED VALUES
            iraStart,
            rothStart,
            taxableStart,
            iraEnd,
            rothEnd,
            taxableEnd,
            // Legacy aliases for UI backward compatibility
            iraBalance: iraEnd,
            rothBalance: rothEnd,
            taxableBalance: taxableEnd,
            // Income layers
            wages,
            pensionIncome: pension,
            rmd,
            rothConversion: conversion,
            socialSecurityGross: ssGross,
            socialSecurityTaxable: ssTaxable,
            interest,
            dividends,
            capitalGains: capGains,
            otherIncome: other,
            // Taxes
            agi,
            standardDeduction: stdDeduction,
            taxableIncome,
            federalTax,
            // MAGI
            magiForIRMAA,
            magiForSSTax,
            // Bracket metadata
            marginalRate,
            bracketIndex,
            // IRMAA
            irmaaTier,
            irmaaSurchargeAnnual,
            // Total yearly impact
            totalTaxPlusIRMAA: federalTax + irmaaSurchargeAnnual,
        });
        /*──────────────────────────────────────────────
          SS COLA update for next year
        ──────────────────────────────────────────────*/
        if (ssActive)
            ssAnnual *= 1 + inflationRate;
    }
    return years;
}
