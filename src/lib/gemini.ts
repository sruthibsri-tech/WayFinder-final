// Thin Gemini wrapper used by the agent layer.
// Centralizes the client, model selection, and a JSON-structured-output helper
// with a deterministic fallback so the pipeline never hard-fails.

import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || "";
export const MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";
export const hasGemini = Boolean(apiKey);

const client = apiKey ? new GoogleGenAI({ apiKey }) : null;

/**
 * Ask the model for a JSON object matching the described shape.
 * Returns `fallback` if Gemini is unavailable or the response can't be parsed.
 */
export async function jsonCompletion<T>(opts: {
  system: string;
  user: string;
  fallback: T;
}): Promise<T> {
  if (!client) return opts.fallback;
  try {
    const res = await client.models.generateContent({
      model: MODEL,
      contents: opts.user,
      config: {
        systemInstruction: opts.system,
        temperature: 0.3,
        responseMimeType: "application/json",
      },
    });
    const raw = res.text;
    if (!raw) return opts.fallback;
    return JSON.parse(raw) as T;
  } catch (err) {
    console.error("[gemini] jsonCompletion failed:", err);
    return opts.fallback;
  }
}

/** Plain-text completion (used for the executive summary). */
export async function textCompletion(opts: {
  system: string;
  user: string;
  fallback: string;
}): Promise<string> {
  if (!client) return opts.fallback;
  try {
    const res = await client.models.generateContent({
      model: MODEL,
      contents: opts.user,
      config: {
        systemInstruction: opts.system,
        temperature: 0.4,
      },
    });
    return res.text?.trim() || opts.fallback;
  } catch (err) {
    console.error("[gemini] textCompletion failed:", err);
    return opts.fallback;
  }
}
