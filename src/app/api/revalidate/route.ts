import { NextResponse } from "next/server";
import { handleWebhookEvent, verifySignature } from "@/lib/marble/webhook";
import { isMarbleWebhookPayload } from "@/types/webhook";

export async function POST(request: Request) {
  const signature = request.headers.get("x-marble-signature");
  const secret = process.env.MARBLE_WEBHOOK_SECRET;

  if (!secret || !signature) {
    return NextResponse.json(
      { error: "Secret or signature missing" },
      { status: 400 },
    );
  }

  const bodyText = await request.text();

  if (!verifySignature(secret, signature, bodyText)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  let payload: unknown;

  try {
    payload = JSON.parse(bodyText);
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON payload" },
      { status: 400 },
    );
  }

  if (!isMarbleWebhookPayload(payload)) {
    return Response.json(
      { error: "Invalid payload structure" },
      { status: 400 },
    );
  }

  try {
    const result = await handleWebhookEvent(payload);
    return NextResponse.json(result);
  } catch (err) {
    console.error("error", err);
    return NextResponse.json(
      { error: "Failed to process webhook" },
      { status: 500 },
    );
  }
}
