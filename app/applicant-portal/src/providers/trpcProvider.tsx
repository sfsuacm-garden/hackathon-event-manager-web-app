import { useUser } from "@/hooks/auth";
import { trpc } from "@/utils/trpc";
import { QueryClient } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { useState } from "react";

export const TRPCProvider = ({
  children,
  queryClient,
}: {
  children: React.ReactNode;
  queryClient: QueryClient;
}) => {
  const eventId = process.env.EVENT_ID;
  const { data: user } = useUser();
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: process.env.NEXT_PUBLIC_API_URL + "/trpc",
          headers() {
            return {
              ...(eventId ? { "x-event-id": eventId } : {}),
              ...(user?.id ? { "x-user-id": user.id } : {}),
            };
          },
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      {children}
    </trpc.Provider>
  );
};
