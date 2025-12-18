import type {
  MarbleAuthorList,
  MarbleCategoryList,
  MarblePost,
  MarblePostList,
  MarbleTagList,
} from "@/types/post";

const url = process.env.MARBLE_API_URL;
const key = process.env.MARBLE_WORKSPACE_KEY;

if (!url || !key) {
  throw new Error(
    "Missing MARBLE_API_URL or MARBLE_WORKSPACE_KEY in environment variables"
  );
}

export async function getPosts() {
  try {
    const raw = await fetch(`${url}/posts`, {
      headers: {
        Authorization: `Bearer ${key}`,
      },
      next: {
        tags: ["posts"],
      },
    });
    const data: MarblePostList = await raw.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getTags() {
  try {
    const raw = await fetch(`${url}/tags`, {
      headers: {
        Authorization: `Bearer ${key}`,
      },
      cache: "force-cache",
      next: {
        tags: ["tags"],
      },
    });
    const data: MarbleTagList = await raw.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getSinglePost(slug: string) {
  try {
    const raw = await fetch(`${url}/posts/${slug}`, {
      headers: {
        Authorization: `Bearer ${key}`,
      },
      cache: "force-cache",
      next: {
        tags: ["posts", slug],
      },
    });
    const data: MarblePost = await raw.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getCategories() {
  try {
    const raw = await fetch(`${url}/categories`, {
      headers: {
        Authorization: `Bearer ${key}`,
      },
      cache: "force-cache",
      next: {
        tags: ["categories"],
      },
    });
    const data: MarbleCategoryList = await raw.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getAuthors() {
  try {
    const raw = await fetch(`${url}/authors`, {
      headers: {
        Authorization: `Bearer ${key}`,
      },
      cache: "force-cache",
      next: {
        tags: ["authors"],
      },
    });
    const data: MarbleAuthorList = await raw.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
