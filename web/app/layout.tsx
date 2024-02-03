import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Aside from "./components/Layout/aside/Aside";
import Footer from "./components/Layout/footer/Footer";
import "./globals.css";
import Providers from "./components/Provider/Providers";
import {
  siteName,
  description,
  openGraphMeta,
  twitterMeta,
  url,
} from "@/utils/shared-metadata";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.VERCEL_URL ?? "http://localhost:12000"),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: description,
  openGraph: {
    ...openGraphMeta,
  },
  twitter: {
    ...twitterMeta,
  },
  alternates: {
    canonical: url,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className}>
        <Providers>
          <Aside />
          {children}
          <Footer />
          <SpeedInsights />
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
