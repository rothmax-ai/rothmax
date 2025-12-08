// api/ocr1040.ts
//
// Vercel serverless function that:
//  - accepts JSON { fileBase64, mimeType, fileName }
//  - enforces size + rate limit
//  - calls OpenAI Vision (gpt-4o-mini) to extract 1040 data
//  - validates JSON into Extracted1040 via src/ocr/validator.ts
//  - returns sanitized Extracted1040
//
// NOTE: Front-end will be responsible for reading the uploaded file,
//       converting to base64, and POSTing JSON. (Phase 3 UI.)

import OpenAI from "openai";

import { OCR_SYSTEM_PROMPT } from "../src/ocr/prompt.js";
import { validateExtracted } from "../src/ocr/validator.js";
import type { Extracted1040 } from "../src/ocr/types.js";

import type { VercelRequest, VercelResponse } from "@vercel/node";


// ---------- CONFIG ----------

const MAX_BYTES = 2_000_000; // 1 MB
const MAX_CALLS_PER_DAY = 10;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Very simple in-memory rate limiter keyed by IP.
// Good enough for v1 serverless; stateless across cold starts.
type RateInfo = { count: number; resetAt: number };
const rateLimitStore = new Map<string, RateInfo>();

function getClientIp(req: VercelRequest): string {
  const xfwd = (req.headers["x-forwarded-for"] as string) || "";
  const ip = xfwd.split(",")[0].trim();
  return ip || req.socket.remoteAddress || "unknown";
}

function checkRateLimit(ip: string): { ok: boolean; retryAfterSeconds?: number } {
  const now = Date.now();
  const existing = rateLimitStore.get(ip);

  if (!existing || existing.resetAt < now) {
    // First call or window reset
    rateLimitStore.set(ip, {
      count: 1,
      resetAt: now + 24 * 60 * 60 * 1000, // 24h
    });
    return { ok: true };
  }

  if (existing.count >= MAX_CALLS_PER_DAY) {
    const retryAfterSeconds = Math.round((existing.resetAt - now) / 1000);
    return { ok: false, retryAfterSeconds };
  }

  existing.count += 1;
  return { ok: true };
}

// Helper: read raw body from VercelRequest
async function readRequestBody(req: VercelRequest): Promise<string> {
  return await new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk: Buffer) => {
        data += chunk;
    });
    req.on("end", () => resolve(data));
    req.on("error", reject);
  });
}

// ---------- HANDLER ----------

export default async function handler(req: VercelRequest, res: VercelResponse) {
    try {
    // 1. Method check
    if (req.method !== "POST") {
      res.setHeader("Allow", "POST");
      return res.status(405).json({ error: "Method Not Allowed" });
    }

    // 2. Rate limiting
    const ip = getClientIp(req);
    const rate = checkRateLimit(ip);
    if (!rate.ok) {
      return res.status(429).json({
        error: "Rate limit exceeded",
        retryAfterSeconds: rate.retryAfterSeconds,
      });
    }

    // 3. Parse JSON body
    const rawBody = await readRequestBody(req);
    let body: Record<string, unknown>;    try {

      body = JSON.parse(rawBody);
    } catch {
      return res.status(400).json({ error: "Invalid JSON" });
    }

    const fileBase64 = body?.fileBase64 as string | undefined;
    const mimeType = body?.mimeType as string | undefined;
    const fileName = body?.fileName as string | undefined;

    if (!fileBase64 || !mimeType) {
      return res.status(400).json({
        error: "Missing fileBase64 or mimeType in request body",
      });
    }

    // 4. Size validation (approximate, based on base64 length)
    const byteLength = Buffer.byteLength(fileBase64, "base64");
    if (byteLength > MAX_BYTES) {
      return res.status(413).json({
        error: `File too large. Max size is ${MAX_BYTES} bytes (1 MB).`,
      });
    }

    // 5. MIME validation (PDF or image)
    const allowedMimeTypes = [
      "application/pdf",
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/webp",
    ];

    if (!allowedMimeTypes.includes(mimeType)) {
      return res.status(400).json({
        error: `Unsupported mimeType '${mimeType}'. Expected one of: ${allowedMimeTypes.join(
          ", "
        )}`,
      });
    }

    // 6. Build data URL for Vision model
    const dataUrl = `data:${mimeType};base64,${fileBase64}`;

    // 7. Call OpenAI Vision with JSON response format
    //
    // NOTE:
    // - We use gpt-4o-mini (cheap) with vision capabilities.
    // - OCR_SYSTEM_PROMPT should describe the Extracted1040 schema
    //   and instruct the model to respond with strict JSON.
    //
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: OCR_SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text:
                "You are reading a US Form 1040 (first 2 pages). Extract the values according to the JSON schema.",
            },
            {
              type: "image_url",
              image_url: {
                url: dataUrl,
              },
            },
          ],
        },
      ],
      response_format: { type: "json_object" },
      temperature: 0,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      return res.status(502).json({
        error: "OpenAI returned no content",
      });
    }

    let rawExtracted: unknown;
    try {
      rawExtracted = JSON.parse(content);
    } catch {
      // In some SDK shapes, content is already an object; fallback here
      rawExtracted = content;
    }

    // 8. Validate & normalize into Extracted1040
    let extracted: Extracted1040;
    try {
      extracted = validateExtracted(rawExtracted);
    } catch (err) {
        console.error("Unexpected error in /api/ocr1040:", err);
        const details = err instanceof Error ? err.message : String(err);
        return res.status(500).json({
          error: "Internal server error",
          details,
        });
      }

    // 9. Success — return sanitized Extracted1040
    return res.status(200).json({
      ok: true,
      fileName: fileName ?? null,
      extracted,
    });
    } catch (err) {
      console.error("Unexpected error in /api/ocr1040:", err);
      const details = err instanceof Error ? err.message : String(err);
      return res.status(500).json({
        error: "Internal server error",
        details,
      });
    }
}