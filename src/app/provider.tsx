"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

import { PrimeReactProvider } from "primereact/api";
import { CartProvider } from "./context/app-context";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <>
      <CartProvider>
        <PrimeReactProvider>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </PrimeReactProvider>
      </CartProvider>
    </>
  );
}
