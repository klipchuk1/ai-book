export interface GeminiPart {
  text?: string;
  inlineData?: {
    data: string;
    mimeType: string;
  };
}

export interface GeminiRequest {
  model: "gemini-3-pro-image-preview" | "gemini-2.5-flash-image";
  contents: Array<{ parts: GeminiPart[] }>;
  generationConfig: {
    responseModalities: ("image" | "text")[];
  };
}

export interface GeminiImageResult {
  success: boolean;
  imageBase64?: string;
  mimeType?: string;
  error?: string;
  durationMs: number;
}

export interface IllustrationPrompt {
  sceneDescription: string;
  faceRequired: boolean;
  order: number;
}
