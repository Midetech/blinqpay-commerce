"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { CartProvider } from "./app-context";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <>
      <CartProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </CartProvider>
    </>
  );
}
