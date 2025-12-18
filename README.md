# Next.js + MarbleCMS Template

A production-ready Next.js template for integrating [MarbleCMS](https://marblecms.com), a headless CMS built for writers and developers. This template demonstrates how to fetch content from Marble's API, build static pages, and handle webhook revalidation.

## Features

- **Static Site Generation** - Pre-rendered pages at build time for optimal performance
- **Dynamic Routes** - Automatic page generation for posts and tags
- **Webhook Integration** - Automatic cache revalidation when content updates in Marble
- **TypeScript** - Full type safety with MarbleCMS API types
- **Modern UI** - Built with Tailwind CSS and Shadcn/ui components
- **SEO Optimized** - Dynamic metadata generation for posts

## Prerequisites

Before you begin, ensure you have:

- Node.js 18+ installed
- A [MarbleCMS](https://marblecms.com) account and workspace
- Your Marble API key (found in your Marble dashboard under Settings > General)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/usemarble/nextjs-example.git
cd nextjs-example
```

### 2. Install dependencies

```bash
pnpm install
# or
npm install
# or
yarn install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory:

```env
MARBLE_API_URL=https://api.marblecms.com/v1
MARBLE_API_KEY=your_api_key_here
MARBLE_WEBHOOK_SECRET=your_webhook_secret_here
```

**Important:** Never expose your `MARBLE_API_KEY` in client-side code. These environment variables should only be accessed on the server during the build process.

### 4. Run the development server

```bash
pnpm dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your site.

## Project Structure

```text
src/
├── app/
│   ├── (site)/              # Main site pages
│   │   ├── page.tsx         # Homepage listing all posts
│   │   ├── post/
│   │   │   └── [slug]/      # Dynamic post pages
│   │   └── tag/
│   │       └── [slug]/      # Dynamic tag pages
│   └── api/
│       └── revalidate/      # Webhook endpoint for cache revalidation
├── components/              # Reusable UI components
│   ├── post-card.tsx        # Post preview card
│   ├── prose.tsx            # Typography component for post content
│   └── ui/                  # Shadcn/ui components
├── lib/
│   ├── marble/
│   │   ├── queries.ts       # API functions to fetch from Marble
│   │   └── webhook.ts       # Webhook signature verification & handling
│   └── site.ts              # Site configuration
└── types/
    ├── post.ts              # TypeScript types for Marble posts
    └── webhook.ts           # Webhook event types
```

### Key Files Explained

- **`src/lib/marble/queries.ts`** - Contains functions to fetch posts, tags, categories, and authors from the Marble API using the `Authorization` header. Uses Next.js cache tags for revalidation.
- **`src/lib/marble/webhook.ts`** - Handles webhook signature verification and triggers Next.js cache revalidation when content updates.
- **`src/app/api/revalidate/route.ts`** - API route endpoint that receives webhooks from Marble and revalidates the cache.
- **`src/app/(site)/post/[slug]/page.tsx`** - Dynamic route that generates static pages for each post using `generateStaticParams()`.

## Configuration

### Environment Variables

| Variable                | Description                             | Required           |
| ----------------------- | --------------------------------------- | ------------------ |
| `MARBLE_API_URL`        | Marble API base URL                     | Yes                |
| `MARBLE_API_KEY`        | Your Marble API key                     | Yes                |
| `MARBLE_WEBHOOK_SECRET` | Secret for verifying webhook signatures | Yes (for webhooks) |

### Next.js Configuration

The `next.config.ts` file includes image domain configuration for Marble's CDN:

```typescript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'images.marblecms.com',
    },
  ],
}
```

## Setting Up Webhooks

To enable automatic cache revalidation when content updates:

1. Go to your Marble dashboard → Webhooks
2. Create a new webhook with your deployment URL: `https://yourdomain.com/api/revalidate`
3. Select events: `post.published`, `post.updated`, `post.deleted`
4. Copy the webhook secret and add it to your `.env.local` as `MARBLE_WEBHOOK_SECRET`

The webhook handler will automatically revalidate:

- The homepage (`/`)
- Individual post pages (`/post/[slug]`)
- The `posts` cache tag

## Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/usemarble/nextjs-example.git)

1. Click the button above or import this repository into Vercel
2. Add your environment variables in Vercel's project settings
3. Deploy

After deployment, update your Marble webhook URL to point to your Vercel deployment.

### Other Platforms

This template works with any hosting platform that supports Next.js:

- **Netlify** - Follow the [Next.js guide](https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/) for seamless deployment
- **Cloudflare** - Deploy with [Cloudflare Pages](https://developers.cloudflare.com/pages/framework-guides/nextjs/) support for Next.js

## Learn More

- [MarbleCMS Documentation](https://docs.marblecms.com)
- [Next.js Documentation](https://nextjs.org/docs)
- [MarbleCMS API Reference](https://docs.marblecms.com/api/introduction)

## License

MIT
