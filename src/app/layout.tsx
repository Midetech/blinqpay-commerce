import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import "primeicons/primeicons.css";
import Providers from "./provider";
import Head from "next/head";

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
      {/* <Head>
        {" "}
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head> */}
      <Providers>
        <body className={inter.className}>{children}</body>
      </Providers>
    </html>
  );
}
