"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { SupabaseAuthProvider } from "./SupabaseAuthProvider";
import { TRPCProvider } from "./trpcProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <SupabaseAuthProvider>
        <TRPCProvider queryClient={queryClient}>{children}</TRPCProvider>
      </SupabaseAuthProvider>
    </QueryClientProvider>
  );
}
