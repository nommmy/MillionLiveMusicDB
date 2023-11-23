import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Aside from "./components/aside/Aside";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Million Live Music DB",
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
        <Aside />
        {children}
      </body>
    </html>
  );
}
