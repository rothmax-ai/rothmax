// src/state/projectionConfig.ts

/**
 * projectionConfig state
 * ----------------------
 * Simple Zustand store holding projection-level settings.
 */

import { create } from "zustand";

interface ProjectionConfigState {
  inflationRate: number;
  applyIRMAA: boolean;
  applyNIIT: boolean;
  horizonYears: number;

  setInflationRate: (v: number) => void;
  setApplyIRMAA: (v: boolean) => void;
  setApplyNIIT: (v: boolean) => void;
  setHorizonYears: (v: number) => void;
}

export const useProjectionConfig = create<ProjectionConfigState>((set) => ({
  inflationRate: 0.02,
  applyIRMAA: true,
  applyNIIT: false,
  horizonYears: 30,

  setInflationRate: (v) => set({ inflationRate: v }),
  setApplyIRMAA: (v) => set({ applyIRMAA: v }),
  setApplyNIIT: (v) => set({ applyNIIT: v }),
  setHorizonYears: (v) => set({ horizonYears: v }),
}));