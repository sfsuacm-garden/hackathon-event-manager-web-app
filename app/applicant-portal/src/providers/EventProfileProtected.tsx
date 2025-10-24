"use client";

import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { useUser } from "@/hooks/auth";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const UserProfileProtectedProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const { user, isLoading: userLoading } = useUser();
  const eventId = process.env.NEXT_PUBLIC_EVENT_ID;
  
  const { 
    data: profile, 
    isPending: profilePending, 
    error 
  } = trpc.profile.me.useQuery(
    undefined, 
    { 
      enabled: Boolean(user) && Boolean(eventId),
    }
  );

  const isLoading = userLoading || profilePending;

  useEffect(() => {
    // Wait for all data to load before making decisions
    if (isLoading) return;

    // No user - redirect to authentication
    if (!user) {
      router.replace("/choose-role");
      return;
    }

    // Error fetching profile - redirect to role selection
    if (error) {
      router.replace("/choose-role");
      return;
    }
  }, [user, profile, isLoading, error, router]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  // Only render children if user exists and has event profile
  if (!user || !profile) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  return <>{children}</>;
};