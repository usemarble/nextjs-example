import { createHmac, timingSafeEqual } from "node:crypto";
import { revalidatePath, revalidateTag } from "next/cache";
import type { MarbleWebhookPayload } from "@/types/webhook";

export function verifySignature(
  secret: string,
  signatureHeader: string,
  bodyText: string,
) {
  // Strip possible "sha256=" prefix
  const expectedHex = signatureHeader.replace(/^sha256=/, "");

  const computedHex = createHmac("sha256", secret)
    .update(bodyText)
    .digest("hex");

  // Convert to buffers for constant-time compare
  const expected = Buffer.from(expectedHex, "hex");
  const computed = Buffer.from(computedHex, "hex");

  // lengths must match for timingSafeEqual
  if (expected.length !== computed.length) return false;

  return timingSafeEqual(expected, computed);
}

export async function handleWebhookEvent(payload: MarbleWebhookPayload) {
  const data = payload.data;
  const resourceType = payload.resource.type;

  if (resourceType === "post") {
    revalidatePath("/");
    revalidatePath("/post/[slug]", "page");
    revalidatePath("/tag/[slug]", "page");
    revalidateTag("posts", "max");

    if (data.slug) {
      revalidatePath(`/post/${data.slug}`);
    }

    return buildResult(true, "Post event handled");
  }

  if (resourceType === "tag") {
    revalidatePath("/");
    revalidatePath("/tag/[slug]", "page");
    revalidateTag("posts", "max");

    if (data.slug) {
      revalidatePath(`/tag/${data.slug}`);
    }

    return buildResult(true, "Tag event handled");
  }

  if (resourceType === "category") {
    revalidatePath("/");
    revalidatePath("/post/[slug]", "page");
    revalidateTag("posts", "max");

    return buildResult(true, "Category event handled");
  }

  if (resourceType === "media") {
    revalidatePath("/", "layout");
    revalidateTag("posts", "max");

    return buildResult(true, "Media event handled");
  }

  return buildResult(false, "Event ignored");
}

function buildResult(revalidated: boolean, message: string) {
  return {
    revalidated,
    now: Date.now(),
    message,
  };
}
