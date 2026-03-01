import { NextRequest, NextResponse } from "next/server";
import { generatePreview } from "@/lib/generation/book-generator";

interface RequestBody {
  photos: Array<{ data: string; mimeType: string }>;
  childName: string;
  gender: "male" | "female";
  bookId: string;
}

export const maxDuration = 120;

export async function POST(request: NextRequest) {
  try {
    const body: RequestBody = await request.json();

    if (!body.photos?.length || !body.childName || !body.gender || !body.bookId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const result = await generatePreview({
      childName: body.childName,
      gender: body.gender,
      bookId: body.bookId,
      photos: body.photos,
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Preview generation failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      images: result.images.map((img) => ({
        base64: img.base64,
        mimeType: img.mimeType,
        label: img.label,
      })),
    });
  } catch (err) {
    console.error("Generate preview error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
