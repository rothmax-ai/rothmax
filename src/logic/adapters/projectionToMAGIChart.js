// src/logic/projection/adapters/projectionToMAGIChart.ts
export function projectionToMAGIChart(years) {
    return years.map((y) => ({
        year: y.year,
        age: y.age,
        magiForIRMAA: y.magiForIRMAA ?? 0,
    }));
}
