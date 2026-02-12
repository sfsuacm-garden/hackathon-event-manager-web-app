import { useSupabaseAuth } from '@/providers/supabaseAuthProvider';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

export const useUserSession = () => {
  const auth = useSupabaseAuth();
  const client = useQueryClient();

  useEffect(() => {
    const { data: listener } = auth.onAuthStateChange((_event, session) => {
      client.setQueryData(['user'], session);
    });

    return () => listener.subscription.unsubscribe();
  }, [auth, client]);

  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const {
        data: { session }
      } = await auth.getSession();
      return session;
    },
    staleTime: Infinity
  });
};
