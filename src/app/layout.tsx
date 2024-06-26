import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Image from "next/image";
import "primeicons/primeicons.css";

import "primereact/resources/themes/lara-light-cyan/theme.css";

import Providers from "./provider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "NextGen Ecommerce",
  description: "Blinq Shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.ico" sizes="any" />

      <body className={` ${inter.className}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
