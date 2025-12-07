// src/state/inputState.ts
// Defines app-level full user input state

import type { Full1040Input } from "../types/inputExtended";
import { defaultFull1040Input } from "../types/inputExtended";

export type FullInputState = Full1040Input;

export const defaultFullInputState: FullInputState = {
  ...defaultFull1040Input
};