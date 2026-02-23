import { NextRequest, NextResponse } from "next/server";
import { createPayment } from "@/lib/yukassa/client";
import { getBookById } from "@/lib/constants/books";
import { personalizeText } from "@/lib/utils/text";

interface RequestBody {
  childName: string;
  sessionId: string;
  bookId: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: RequestBody = await request.json();

    if (!body.childName || !body.sessionId || !body.bookId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const book = getBookById(body.bookId);
    if (!book) {
      return NextResponse.json(
        { error: "Book not found" },
        { status: 404 }
      );
    }

    const bookTitle = personalizeText(book.title, body.childName, "male");
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const payment = await createPayment({
      amountRub: book.priceRub,
      description: `Книга «${bookTitle}» для ${body.childName} (PDF)`,
      returnUrl: `${appUrl}/create/payment-result?session=${body.sessionId}`,
      metadata: {
        sessionId: body.sessionId,
        childName: body.childName,
        bookId: body.bookId,
      },
    });

    return NextResponse.json({
      paymentId: payment.id,
      confirmationUrl: payment.confirmation?.confirmation_url,
      status: payment.status,
    });
  } catch (err) {
    console.error("Create payment error:", err);
    return NextResponse.json(
      { error: "Failed to create payment" },
      { status: 500 }
    );
  }
}
