import { createBrowserClient } from "@supabase/ssr";
import { SupabaseClient } from "@supabase/supabase-js";
import { useContext, createContext } from "react";

const SupabaseContext = createContext<SupabaseClient | null>(null);

export const SupabaseProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const client = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  return (
    <SupabaseContext.Provider value={client}>
      {children}
    </SupabaseContext.Provider>
  );
};

export const useSupabase = () => {
  const client = useContext(SupabaseContext);
  if (!client)
    throw new Error("useSupabase must be used within SupabaseProvider");
  return client;
};
