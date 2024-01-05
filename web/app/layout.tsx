import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Aside from "./components/Layout/aside/Aside";
import Footer from "./components/Layout/footer/Footer";
import "./globals.css";
import Providers from "./components/Provider/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MillionLive Music DB",
  description:
    "This is an app for beginners of MillionLive to get them interested in MillionLive through the goodness of MillionLive music.",
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
