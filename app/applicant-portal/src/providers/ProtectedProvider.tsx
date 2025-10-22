"use client";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { useUser } from "@/hooks/auth";
import { trpc } from "@/utils/trpc";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";

interface ProtectedContextValue {
  user: User | null;
  userProfile: ReturnType<typeof trpc.profile.me.useQuery>["data"];
  eventProfile: ReturnType<typeof trpc.eventProfile.me.useQuery>["data"];
  isProtectionLoading: boolean;
}

const ProtectedContext = createContext<ProtectedContextValue | undefined>(
  undefined
);

export const ProtectedProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const {user, isLoading: userLoading} = useUser();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const { data: userProfile, isLoading: profileLoading } = trpc.profile.me.useQuery(
    undefined,
    { enabled: Boolean(user),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false, 
 } );

  const { data: eventProfile, isLoading: eventLoading } = trpc.eventProfile.me.useQuery(
    {},
    { enabled: Boolean(user),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
 } );

  const isProtectionLoading = !user || profileLoading || eventLoading || userLoading;

  useEffect(() => {
    if (isProtectionLoading) return;

    if (!user) {
      setIsRedirecting(true);
      router.replace("/choose-role");
    } else if (!userProfile) {
      setIsRedirecting(true);
      router.replace("/create-profile");
    } else if (!eventProfile) {
      setIsRedirecting(true);
      router.replace("/application");
    }
  }, [isProtectionLoading, user, userProfile, eventProfile, router]);

  // Show loading during initial load OR during redirects
  if (isProtectionLoading || isRedirecting) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <ProtectedContext.Provider value={{ user, userProfile, eventProfile, isProtectionLoading }}>
      {children}
    </ProtectedContext.Provider>
  );
};