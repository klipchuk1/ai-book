import { NextRequest, NextResponse } from "next/server";
import { getPayment } from "@/lib/yukassa/client";

export async function GET(request: NextRequest) {
  try {
    const paymentId = request.nextUrl.searchParams.get("paymentId");

    if (!paymentId) {
      return NextResponse.json(
        { error: "Missing paymentId" },
        { status: 400 }
      );
    }

    const payment = await getPayment(paymentId);

    return NextResponse.json({
      paymentId: payment.id,
      status: payment.status,
      paid: payment.paid,
      metadata: payment.metadata,
    });
  } catch (err) {
    console.error("Payment status error:", err);
    return NextResponse.json(
      { error: "Failed to get payment status" },
      { status: 500 }
    );
  }
}
