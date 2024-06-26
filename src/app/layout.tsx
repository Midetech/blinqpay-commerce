import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import "primeicons/primeicons.css";
import Providers from "./provider";
import Head from "next/head";
import Image from "next/image";

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

      <Providers>
        <body className={` ${inter.className}`}>
          {children}
          <footer className="h-12 w-full  px-8 flex items-center justify-between border-t">
            <Image src={"/logo.png"} alt="Blinq Shop" width={30} height={20} />

            <p>Copyright &copy; {new Date().getFullYear()}</p>
          </footer>
        </body>
      </Providers>
    </html>
  );
}
