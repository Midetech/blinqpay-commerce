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

      <Providers>
        <body className={` ${inter.className}`}>
          {children}
          <footer className="h-12 w-full  px-8 flex items-center justify-between border-t">
            <Image
              src={"/blinqshop.png"}
              alt="Blinq Shop"
              width={100}
              height={100}
              className="w-[80px] h-[40px]"
            />

            <p className="text-sm text-gray-700">
              Copyright &copy; {new Date().getFullYear()}
            </p>
          </footer>
        </body>
      </Providers>
    </html>
  );
}
