import "./globals.css";
import type { Metadata } from "next";
import React from "react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

// Providers is a component from next-themes
// Theme switcher
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Bitcoin Wallet",
  description:
    "A simple Bitcoin wallet using Next.js, React.js, and BitcoinJS. Do not use this wallet with real Bitcoin!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
