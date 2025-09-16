import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../../../shared/trpc/index.ts';

export const trpcClient = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: process.env.NEXT_PUBLIC_TRPC_URL + '/trpc', // e.g., http://localhost:4000
    }),
  ],
});
