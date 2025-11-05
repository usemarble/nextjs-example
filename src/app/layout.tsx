import "@/styles/globals.css";
import type { Metadata } from "next";
import { Geist_Mono, Literata, Manrope } from "next/font/google";
import { SITE } from "@/lib/site";
import { Analytics } from "@vercel/analytics/next";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const literata = Literata({
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: SITE.title,
  description: SITE.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.variable} ${geistMono.variable} ${literata.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
