import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
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
import { Analytics } from "@vercel/analytics/react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import dynamic from "next/dynamic";

const AsideContentsWithDynamicImport = dynamic(
  () => import("@/app/components/Layout/aside/AsideContents"),
  {
    ssr: true,
  }
);

const inter = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "800"],
  display: "swap",
});

export const metadata: Metadata = {
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
        <AppRouterCacheProvider>
          <Providers>
            <Aside>
              <AsideContentsWithDynamicImport />
            </Aside>
            {children}
            <Footer />
            <SpeedInsights />
            <Analytics />
          </Providers>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
