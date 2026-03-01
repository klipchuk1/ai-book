import {
  generateImage,
  buildFaceIllustrationRequest,
  buildBackgroundRequest,
} from "@/lib/gemini/client";
import { getBookById } from "@/lib/constants/books";
import { personalizeText } from "@/lib/utils/text";
import { generateBookPdf, type BookPage } from "@/lib/pdf/generator";

interface GenerationProgress {
  total: number;
  completed: number;
  currentScene: string;
}

interface BookGenerationParams {
  childName: string;
  gender: "male" | "female";
  age: number;
  bookId: string;
  photos: Array<{ data: string; mimeType: string }>;
  onProgress?: (progress: GenerationProgress) => void;
}

interface BookGenerationResult {
  success: boolean;
  pdfBuffer?: Buffer;
  imageCount: number;
  error?: string;
}

const DELAY_BETWEEN_REQUESTS_MS = 3000;

async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// --- Preview generation (cover + 1 illustration) ---

interface PreviewParams {
  childName: string;
  gender: "male" | "female";
  bookId: string;
  photos: Array<{ data: string; mimeType: string }>;
}

export interface PreviewImage {
  base64: string;
  mimeType: string;
  label: string;
}

interface PreviewResult {
  success: boolean;
  images: PreviewImage[];
  error?: string;
}

export async function generatePreview(
  params: PreviewParams
): Promise<PreviewResult> {
  const { childName, gender, bookId, photos } = params;

  const book = getBookById(bookId);
  if (!book) {
    return { success: false, images: [], error: `Book not found: ${bookId}` };
  }

  const images: PreviewImage[] = [];

  // 1. Generate cover
  const coverPrompt = gender === "male" ? book.coverPromptMale : book.coverPromptFemale;
  const personalizedCoverPrompt = personalizeText(coverPrompt, childName, gender);

  let coverResult = await generateImage(
    buildFaceIllustrationRequest(personalizedCoverPrompt, photos)
  );

  if (!coverResult.success || !coverResult.imageBase64) {
    await delay(2000);
    coverResult = await generateImage(
      buildFaceIllustrationRequest(personalizedCoverPrompt, photos)
    );
  }

  if (coverResult.success && coverResult.imageBase64) {
    images.push({
      base64: coverResult.imageBase64,
      mimeType: coverResult.mimeType || "image/png",
      label: "cover",
    });
  } else {
    return { success: false, images: [], error: `Cover failed: ${coverResult.error}` };
  }

  // 2. Generate first illustration from chapter 1
  const firstChapter = book.chapters[0];
  if (firstChapter) {
    const firstIllustration = firstChapter.pages.find(
      (p) => p.type === "illustration" && (gender === "male" ? p.promptMale : p.promptFemale)
    );

    if (firstIllustration) {
      await delay(DELAY_BETWEEN_REQUESTS_MS);
      const rawPrompt = gender === "male" ? firstIllustration.promptMale : firstIllustration.promptFemale;
      const prompt = personalizeText(rawPrompt!, childName, gender);

      const req = firstIllustration.faceRequired
        ? buildFaceIllustrationRequest(prompt, photos)
        : buildBackgroundRequest(prompt);

      let result = await generateImage(req);
      if (!result.success || !result.imageBase64) {
        await delay(2000);
        result = await generateImage(req);
      }

      if (result.success && result.imageBase64) {
        images.push({
          base64: result.imageBase64,
          mimeType: result.mimeType || "image/png",
          label: "illustration",
        });
      }
    }
  }

  return { success: true, images };
}

// --- Full book generation ---

export async function generateFullBook(
  params: BookGenerationParams
): Promise<BookGenerationResult> {
  const { childName, gender, bookId, photos, onProgress } = params;

  const book = getBookById(bookId);
  if (!book) {
    return { success: false, imageCount: 0, error: `Book not found: ${bookId}` };
  }

  // Count total illustrations
  const illustrationCount = book.chapters.reduce(
    (sum, ch) => sum + ch.pages.filter((p) => p.type === "illustration").length,
    0
  );
  const totalImages = illustrationCount + 1; // +1 for cover
  let completedImages = 0;

  const report = (scene: string) => {
    onProgress?.({ total: totalImages, completed: completedImages, currentScene: scene });
  };

  const bookPages: BookPage[] = [];

  // 1. Generate cover
  report("Создаём обложку...");
  const coverPrompt = gender === "male" ? book.coverPromptMale : book.coverPromptFemale;
  const personalizedCoverPrompt = personalizeText(coverPrompt, childName, gender);

  const coverResult = await generateImage(
    buildFaceIllustrationRequest(personalizedCoverPrompt, photos)
  );

  if (!coverResult.success || !coverResult.imageBase64) {
    await delay(2000);
    const retry = await generateImage(
      buildFaceIllustrationRequest(personalizedCoverPrompt, photos)
    );
    if (!retry.success || !retry.imageBase64) {
      return { success: false, imageCount: 0, error: `Cover failed: ${retry.error}` };
    }
    bookPages.push({
      type: "cover",
      imageBase64: retry.imageBase64,
      imageMimeType: retry.mimeType,
    });
  } else {
    bookPages.push({
      type: "cover",
      imageBase64: coverResult.imageBase64,
      imageMimeType: coverResult.mimeType,
    });
  }
  completedImages++;

  // 2. Generate each chapter
  for (let chIdx = 0; chIdx < book.chapters.length; chIdx++) {
    const chapter = book.chapters[chIdx];
    const chapterTitle = personalizeText(chapter.title, childName, gender);

    // Chapter title page
    bookPages.push({ type: "title", title: chapterTitle });

    // Process each page
    for (const page of chapter.pages) {
      if (page.type === "text") {
        bookPages.push({
          type: "text",
          text: personalizeText(page.text!, childName, gender),
        });
        continue;
      }

      if (page.type === "illustration") {
        await delay(DELAY_BETWEEN_REQUESTS_MS);

        const sceneName = `Глава ${chIdx + 1} (${completedImages + 1}/${totalImages})`;
        report(sceneName);

        // Select gender-appropriate prompt
        const rawPrompt = gender === "male" ? page.promptMale : page.promptFemale;
        if (!rawPrompt) {
          completedImages++;
          continue;
        }

        const prompt = personalizeText(rawPrompt, childName, gender);

        const req = page.faceRequired
          ? buildFaceIllustrationRequest(prompt, photos)
          : buildBackgroundRequest(prompt);

        let result = await generateImage(req);

        // Retry once on failure
        if (!result.success || !result.imageBase64) {
          await delay(2000);
          result = await generateImage(req);
        }

        if (result.success && result.imageBase64) {
          bookPages.push({
            type: "illustration",
            imageBase64: result.imageBase64,
            imageMimeType: result.mimeType,
          });
        } else {
          console.error(`Failed illustration: ${result.error}`);
        }
        completedImages++;
      }
    }
  }

  // 3. Add teaser page
  if (book.nextBookTeaser) {
    bookPages.push({
      type: "teaser",
      text: personalizeText(book.nextBookTeaser, childName, gender),
    });
  }

  // 4. Generate PDF
  report("Собираем PDF...");
  try {
    const pdfBuffer = await generateBookPdf({
      childName,
      bookTitle: personalizeText(book.title, childName, gender),
      pages: bookPages,
    });

    return {
      success: true,
      pdfBuffer,
      imageCount: completedImages,
    };
  } catch (err) {
    return {
      success: false,
      imageCount: completedImages,
      error: `PDF generation failed: ${err instanceof Error ? err.message : "unknown"}`,
    };
  }
}
