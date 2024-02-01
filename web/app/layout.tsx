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
} from "@/utils/shared-metadata";

const inter = Inter({ subsets: ["latin"] });

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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <Providers>
          <Aside />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
