import type {
  Post,
  PostResponse,
  PostsListResponse,
  TagsListResponse,
} from "@usemarble/sdk/models";
import { marble } from "@/lib/marble/client";

export async function getPosts(): Promise<PostsListResponse | undefined> {
  try {
    const data = await marble.posts.list();
    return data.result;
  } catch (error) {
    console.log(error);
  }
}

export async function getTags(): Promise<TagsListResponse | undefined> {
  try {
    const data = await marble.tags.list();
    return data.result;
  } catch (error) {
    console.log(error);
  }
}

export async function getSinglePost(
  slug: string,
): Promise<PostResponse | undefined> {
  try {
    const data = await marble.posts.get({ identifier: slug });
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getPostsByTag(
  tag: string,
): Promise<PostsListResponse | undefined> {
  try {
    const data = await marble.posts.list({ tags: tag });
    return data.result;
  } catch (error) {
    console.log(error);
  }
}

export type { Post };
