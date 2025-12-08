import { Fragment } from "react";
import Container from "@/components/container";
import PostCard from "@/components/post-card";
import { getPosts } from "@/lib/marble/queries";

export default async function HomePage() {
  const data = await getPosts();
  if (!data || !data.posts) return <div>No posts yet</div>;

  return (
    <section>
      <Container className="py-10">
        <ul className="grid justify-center gap-20 grid-cols-[repeat(auto-fill,minmax(0,_400px))] w-full">
          {data.posts.map((post) => (
            <Fragment key={post.id}>
              <PostCard post={post} />
            </Fragment>
          ))}
        </ul>
      </Container>
    </section>
  );
}
