'use client';

import { useUserSession } from '@/hooks/auth';
import { trpc } from '@/utils/trpc';
import { QueryClient } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { useMemo } from 'react';

export const TRPCProvider = ({
  children,
  queryClient
}: {
  children: React.ReactNode;
  queryClient: QueryClient;
}) => {
  const eventId = process.env.NEXT_PUBLIC_EVENT_ID;
  const session = useUserSession();
  const trpcClient = useMemo(
    () =>
      trpc.createClient({
        links: [
          httpBatchLink({
            url: "/trpc",
            headers() {
              const token = session.data?.access_token;
              return {
                ...(eventId ? { 'x-event-id': eventId } : {}),
                ...(token ? { authorization: `Bearer ${token}` } : {})
              };
            }
          })
        ]
      }),
    [session.data?.access_token, eventId] // recreate only if these change
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      {children}
    </trpc.Provider>
  );
};
