export type MarbleWebhookType =
  | "post.published"
  | "post.updated"
  | "post.deleted"
  | "tag.created"
  | "tag.updated"
  | "tag.deleted"
  | "category.created"
  | "category.updated"
  | "category.deleted"
  | "media.deleted";

export type MarbleResourceType = "post" | "tag" | "category" | "media";

export type MarbleWebhookPayload = {
  id: string;
  type: MarbleWebhookType;
  createdAt: string;
  workspaceId: string;
  resource: {
    type: MarbleResourceType;
    id: string;
  };
  actor: {
    type: string;
    id: string;
  };
  data: MarbleWebhookData;
};

export type MarbleWebhookData = {
  id: string;
  slug?: string;
  title?: string;
  description?: string;
  coverImage?: string | null;
  status?: string;
  featured?: boolean;
  categoryId?: string | null;
  primaryAuthorId?: string | null;
  publishedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
  name?: string;
};

const MARBLE_WEBHOOK_TYPES = [
  "post.published",
  "post.updated",
  "post.deleted",
  "tag.created",
  "tag.updated",
  "tag.deleted",
  "category.created",
  "category.updated",
  "category.deleted",
  "media.deleted",
] as const satisfies MarbleWebhookType[];

const MARBLE_RESOURCE_TYPES = [
  "post",
  "tag",
  "category",
  "media",
] as const satisfies MarbleResourceType[];

export function isMarbleWebhookPayload(
  value: unknown,
): value is MarbleWebhookPayload {
  if (!value || typeof value !== "object") {
    return false;
  }

  const payload = value as {
    id?: unknown;
    type?: unknown;
    createdAt?: unknown;
    workspaceId?: unknown;
    resource?: { type?: unknown; id?: unknown };
    actor?: { type?: unknown; id?: unknown };
    data?: unknown;
  };

  return (
    typeof payload.id === "string" &&
    typeof payload.type === "string" &&
    MARBLE_WEBHOOK_TYPES.includes(payload.type as MarbleWebhookType) &&
    typeof payload.createdAt === "string" &&
    typeof payload.workspaceId === "string" &&
    !!payload.resource &&
    typeof payload.resource === "object" &&
    typeof payload.resource.type === "string" &&
    MARBLE_RESOURCE_TYPES.includes(
      payload.resource.type as MarbleResourceType,
    ) &&
    typeof payload.resource.id === "string" &&
    !!payload.actor &&
    typeof payload.actor === "object" &&
    typeof payload.actor.type === "string" &&
    typeof payload.actor.id === "string" &&
    !!payload.data &&
    typeof payload.data === "object"
  );
}
