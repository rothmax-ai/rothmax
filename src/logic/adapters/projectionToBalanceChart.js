// src/logic/projection/adapters/projectionToBalanceChart.ts
export function projectionToBalanceChart(years) {
    return years.map((y) => ({
        year: y.year,
        age: y.age,
        ira: y.iraBalance ?? 0,
        roth: y.rothBalance ?? 0,
        taxable: y.taxableBalance ?? 0,
    }));
}
