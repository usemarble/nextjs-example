import type {
  MarbleAuthorList,
  MarbleCategoryList,
  MarblePost,
  MarblePostList,
  MarbleTagList,
} from "@/types/post";

const url = process.env.MARBLE_API_URL;
const key = process.env.MARBLE_WORKSPACE_KEY;

export async function getPosts() {
  try {
    const raw = await fetch(`${url}/${key}/posts`, {
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
    const raw = await fetch(`${url}/${key}/tags`, {
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
    const raw = await fetch(`${url}/${key}/posts/${slug}`, {
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
    const raw = await fetch(`${url}/${key}/categories`, {
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
    const raw = await fetch(`${url}/${key}/authors`, {
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
