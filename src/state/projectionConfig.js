// src/state/projectionConfig.ts
/**
 * projectionConfig state
 * ----------------------
 * Simple Zustand store holding projection-level settings.
 */
import { create } from "zustand";
export const useProjectionConfig = create((set) => ({
    inflationRate: 0.02,
    applyIRMAA: true,
    applyNIIT: false,
    horizonYears: 30,
    setInflationRate: (v) => set({ inflationRate: v }),
    setApplyIRMAA: (v) => set({ applyIRMAA: v }),
    setApplyNIIT: (v) => set({ applyNIIT: v }),
    setHorizonYears: (v) => set({ horizonYears: v }),
}));
