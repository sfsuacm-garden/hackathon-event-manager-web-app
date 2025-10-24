import { supabaseAuth } from '@/utils/supabase/client';
import { SupabaseAuthClient } from '@supabase/supabase-js/dist/module/lib/SupabaseAuthClient';
import { createContext, useContext } from 'react';

const SupabaseAuthContext = createContext<SupabaseAuthClient | null>(null);

export const SupabaseAuthProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SupabaseAuthContext.Provider value={supabaseAuth}>{children}</SupabaseAuthContext.Provider>
  );
};

export const useSupabaseAuth = () => {
  const client = useContext(SupabaseAuthContext);
  if (!client) throw new Error('useSupabaseAuth must be used within SupabaseProvider');
  return client;
};
