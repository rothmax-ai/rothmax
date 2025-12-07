// src/state/inputState.ts
import { create } from "zustand";
import { defaultInputs } from "./defaults";
export const useInputState = create()((set) => ({
    ...defaultInputs,
    setField: (field, value) => set((state) => ({
        ...state,
        [field]: value,
    })),
}));
