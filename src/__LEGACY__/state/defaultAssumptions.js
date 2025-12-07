export const defaultAssumptions = {
    // balances
    iraBalance: 300000,
    rothBalance: 150000,
    taxableBalance: 50000,
    pretax401kBalance: 0,
    cashBalance: 0,
    // basic assumptions
    lifeExpectancy: 85,
    growthRate: 0.04,
    inflationRate: 0.025,
    taxableYieldRate: 0.02,
    stateTaxRate: 0.05,
    // family / filing
    spouseAge: null,
    plannedRetirementAge: 65,
    ssStartAge: 67,
    pensionIncome: 0,
    medicareStartAge: 65,
    // RMD strategy
    rmdStartAge: 73,
    annualConversionLimit: null,
    avoidIRMAA: false,
    avoidBracket: null,
    useRothForPre2033RMD: false,
    // IRMAA & Medicare
    irmaaInflationRate: 0.025,
    partBBasePremium: 174.70, // 2024 baseline
    applyNIIT: true,
};
