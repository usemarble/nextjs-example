import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Container from "@/components/container";
import Prose from "@/components/prose";
import { getPosts, getSinglePost } from "@/lib/marble/queries";
import { SITE } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  // read route params
  const slug = (await params).slug;

  // fetch data
  const data = await getSinglePost(slug);

  if (!data || !data.post) return {};

  return {
    metadataBase: new URL(SITE.url),
    title: data.post.title,
    description: data.post.description,
    twitter: {
      title: `${data.post.title}`,
      description: `${data.post.description || SITE.description}`,
      card: "summary_large_image",
      site: `${SITE.url}/${slug}`,
      images: [
        {
          url: data.post.coverImage || "",
          width: "1200",
          height: "630",
          alt: data.post.title,
        },
      ],
    },
    openGraph: {
      type: "article",
      siteName: "",
      images: [
        {
          url: data.post.coverImage || "",
          width: "1200",
          height: "630",
          alt: data.post.title,
        },
      ],
      title: data.post.title,
      description: data.post.description,
      publishedTime: new Date(data.post.publishedAt).toISOString(),
      authors: [...data.post.authors.map((author) => author.name)],
    },
  };
}

export async function generateStaticParams() {
  const data = await getPosts();
  if (!data || !data.posts.length) return [];

  return data.posts.map((post) => ({
    slug: post.slug,
  }));
}

async function Page({ params }: PageProps) {
  const slug = (await params).slug;
  const data = await getSinglePost(slug);
  if (!data || !data.post) return notFound();

  const formattedDate = new Date(data.post.publishedAt).toLocaleDateString(
    "en-US",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    },
  );

  return (
    <Container className="min-h-[calc(100vh-100px)] py-14">
      <section className="space-y-6 lg:space-y-8 max-w-3xl mx-auto">
        <div className="flex flex-col items-center gap-4">
          <h1 className="font-serif text-3xl lg:text-4xl text-center">
            {data.post.title}
          </h1>
          <time dateTime={data.post.publishedAt.toString()}>
            {formattedDate}
          </time>
          <div className="flex items-center gap-2">
            <Image
              src={data.post.authors[0].image || ""}
              alt={data.post.authors[0].name}
              width={36}
              height={36}
              loading="eager"
              className="aspect-square shrink-0 size-8 rounded-full"
            />
            <p className="text-muted-foreground">{data.post.authors[0].name}</p>
          </div>
        </div>
        <div className="relative min-h-[360px] md:min-h-[400px] lg:min-h-[430px]">
          <Image
            src={data.post.coverImage || ""}
            alt={data.post.title}
            loading="eager"
            fill
            className="object-cover size-full max-sm:max-h-[360px]"
          />
        </div>
        <Prose html={data.post.content} />
      </section>
    </Container>
  );
}

export default Page;
