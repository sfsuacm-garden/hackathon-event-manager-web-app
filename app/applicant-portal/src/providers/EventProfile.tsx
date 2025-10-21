import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { useUser } from "@/hooks/auth";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";

export const EventProfileProtectedProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const user = useUser();
  const eventId = process.env.NEXT_PUBLIC_EVENT_ID;
  const { data: eventProfile, isPending, error } = trpc.eventProfile.me.useQuery(
    undefined, { 
    enabled: Boolean(user) && Boolean(eventId),
    refetchOnWindowFocus: true,
    staleTime: 10 * 60 * 1000, 
  }
  );

  useEffect(() => {
    if (!user) {
      router.push("/choose-role");
      return;
    }

    if (!isPending && !eventProfile && !error) {
      router.push(`/events/application`);
    }

    if (error) {
 
      router.push(`/events/choose-role`);
    }
  }, [user, eventProfile, isPending, error, router, eventId]);

  if (isPending) {
    return <div><Spinner/></div>; 
  }

  if (user && eventProfile) {
    return <>{children}</>;
  }

  return null;
};