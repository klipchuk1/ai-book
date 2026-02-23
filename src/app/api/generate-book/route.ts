import { NextRequest, NextResponse } from "next/server";
import { generateFullBook } from "@/lib/generation/book-generator";

interface RequestBody {
  photos: Array<{ data: string; mimeType: string }>;
  childName: string;
  gender: "male" | "female";
  age: number;
  bookId: string;
}

export const maxDuration = 300;

export async function POST(request: NextRequest) {
  try {
    const body: RequestBody = await request.json();

    if (!body.photos?.length || !body.childName || !body.gender || !body.bookId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const result = await generateFullBook({
      childName: body.childName,
      gender: body.gender,
      age: body.age,
      bookId: body.bookId,
      photos: body.photos,
    });

    if (!result.success || !result.pdfBuffer) {
      return NextResponse.json(
        { error: result.error || "Book generation failed" },
        { status: 500 }
      );
    }

    const uint8 = new Uint8Array(result.pdfBuffer);
    return new NextResponse(uint8, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${encodeURIComponent(body.childName)}_${body.bookId}.pdf"`,
        "Content-Length": uint8.length.toString(),
      },
    });
  } catch (err) {
    console.error("Generate book error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
