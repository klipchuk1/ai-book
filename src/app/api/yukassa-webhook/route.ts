import { NextRequest, NextResponse } from "next/server";
import type { YookassaWebhookEvent } from "@/lib/yukassa/types";

// YooKassa sends webhook notifications for payment status changes.
// In Phase 1 we log the event; in Phase 2 we'll update order status in Supabase.

export async function POST(request: NextRequest) {
  try {
    const event: YookassaWebhookEvent = await request.json();

    console.log(
      `[YooKassa Webhook] ${event.event} | Payment ${event.object.id} | Status: ${event.object.status}`
    );

    if (event.event === "payment.succeeded") {
      const { metadata } = event.object;
      console.log(
        `[YooKassa] Payment succeeded for session ${metadata?.sessionId}, child: ${metadata?.childName}, book: ${metadata?.bookId}`
      );
    }

    if (event.event === "payment.canceled") {
      console.log(
        `[YooKassa] Payment canceled: ${event.object.id}`
      );
    }

    // YooKassa expects 200 response
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Webhook error:", err);
    // Still return 200 to prevent retries on parse errors
    return NextResponse.json({ success: false });
  }
}
