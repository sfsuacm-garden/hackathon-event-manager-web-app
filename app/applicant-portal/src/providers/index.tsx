"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SupabaseAuthProvider } from "./SupabaseAuthProvider";
import { TRPCProvider } from "./trpcProvider";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SupabaseAuthProvider>
        <TRPCProvider queryClient={queryClient}>{children}</TRPCProvider>
      </SupabaseAuthProvider>
    </QueryClientProvider>
  );
}
