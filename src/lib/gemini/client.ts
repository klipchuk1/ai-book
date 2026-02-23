import type { GeminiRequest, GeminiImageResult, GeminiPart } from "./types";

const PROXY_URL = process.env.GEMINI_PROXY_URL!;
const PROXY_SECRET = process.env.GEMINI_PROXY_SECRET!;

export async function generateImage(
  request: GeminiRequest
): Promise<GeminiImageResult> {
  const start = Date.now();

  try {
    const response = await fetch(`${PROXY_URL}/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-proxy-secret": PROXY_SECRET,
      },
      body: JSON.stringify({
        model: request.model,
        contents: request.contents,
        generationConfig: request.generationConfig,
      }),
    });

    const data = await response.json();
    const durationMs = Date.now() - start;

    if (data.error) {
      return { success: false, error: data.error.message ?? data.error, durationMs };
    }

    const imagePart = data.candidates?.[0]?.content?.parts?.find(
      (p: GeminiPart) => p.inlineData
    );

    if (!imagePart?.inlineData) {
      return { success: false, error: "No image in response", durationMs };
    }

    return {
      success: true,
      imageBase64: imagePart.inlineData.data,
      mimeType: imagePart.inlineData.mimeType,
      durationMs,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      durationMs: Date.now() - start,
    };
  }
}

export function buildFaceIllustrationRequest(
  scenePrompt: string,
  photoBase64Array: Array<{ data: string; mimeType: string }>
): GeminiRequest {
  const parts: GeminiPart[] = [
    {
      text: "Here are reference photos of a child. Create an illustration where the main character has the same facial features as this child. Keep the resemblance recognizable but stylize as a watercolor children book illustration:",
    },
  ];

  for (const photo of photoBase64Array) {
    parts.push({
      inlineData: { data: photo.data, mimeType: photo.mimeType },
    });
  }

  parts.push({ text: scenePrompt });

  return {
    model: "gemini-3-pro-image-preview",
    contents: [{ parts }],
    generationConfig: { responseModalities: ["image", "text"] },
  };
}

export function buildBackgroundRequest(scenePrompt: string): GeminiRequest {
  return {
    model: "gemini-2.5-flash-image",
    contents: [{ parts: [{ text: scenePrompt }] }],
    generationConfig: { responseModalities: ["image", "text"] },
  };
}
