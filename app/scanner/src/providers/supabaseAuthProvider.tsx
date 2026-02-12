import { SupabaseClient } from '@supabase/supabase-js';
import { createContext, useContext } from 'react';
import { supabaseAuth } from '../utils/supabaseClient';

const SupabaseAuthContext = createContext<SupabaseClient | null>(null);

export const SupabaseAuthProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SupabaseAuthContext.Provider value={supabaseAuth}>{children}</SupabaseAuthContext.Provider>
  );
};

export const useSupabaseAuth = () => {
  const client = useContext(SupabaseAuthContext);
  if (!client) throw new Error('useSupabaseAuth must be used within SupabaseProvider');
  return client.auth;
};
