"use client";

import { createBrowserClient } from "@supabase/ssr";
import { SupabaseAuthClient } from "@supabase/supabase-js/dist/module/lib/SupabaseAuthClient";
import { createContext, useContext, useMemo } from "react";

const SupabaseAuthContext = createContext<SupabaseAuthClient | null>(null);

export const SupabaseAuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const auth = useMemo(
    () =>
      createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      ).auth,
    []
  );

  return (
    <SupabaseAuthContext.Provider value={auth}>
      {children}
    </SupabaseAuthContext.Provider>
  );
};

export const useSupabaseAuth = () => {
  const client = useContext(SupabaseAuthContext);
  if (!client)
    throw new Error("useSupabaseAuth must be used within SupabaseProvider");
  return client;
};
