// src/ocr/types.ts
// ---------------------------------------------
// Shared OCR types
// ---------------------------------------------

import type { Extracted1040 as Extracted1040Schema } from "./schema";

/**
 * Canonical OCR extraction result for a 1040.
 * Alias exported so we can evolve internals without breaking imports.
 */
export type Extracted1040 = Extracted1040Schema;

/**
 * Raw JSON coming back from OpenAI before validation.
 * (Kept as unknown to force explicit validation.)
 */
export type OCRRawJson = unknown;