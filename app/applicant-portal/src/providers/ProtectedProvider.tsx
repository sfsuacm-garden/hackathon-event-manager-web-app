"use client";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { useUser } from "@/hooks/auth";
import { trpc } from "@/utils/trpc";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect } from "react";


interface BaseProtectedContextValue {
  user: User | null;
  userProfile: ReturnType<typeof trpc.profile.me.useQuery>["data"];
}

interface FullyProtectedContextValue extends BaseProtectedContextValue {
  eventProfile: ReturnType<typeof trpc.eventProfile.me.useQuery>["data"];
}

const BaseProtectedContext = createContext<BaseProtectedContextValue | undefined>(undefined);
const FullyProtectedContext = createContext<FullyProtectedContextValue | undefined>(undefined);

export const useBaseProtected = () => {
  const ctx = useContext(BaseProtectedContext);
  if (!ctx) throw new Error("useBaseProtected must be used within BaseProtectedProvider");
  return ctx;
};

export const useFullyProtected = () => {
  const ctx = useContext(FullyProtectedContext);
  if (!ctx) throw new Error("useFullyProtected must be used within FullyProtectedProvider");
  return ctx;
};

export const AuthOnlyProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { user, isLoading: userLoading } = useUser();

  useEffect(() => {
    if (userLoading) return;

    if (!user) {
      router.replace("/choose-role");
    }
  }, [userLoading, user, router]);

  if (userLoading || !user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  return <>{children}</>;
};

//  BaseProtectedProvider - requires user + userProfile only (for application page)
export const BaseProtectedProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { user, isLoading: userLoading } = useUser();

  const { data: userProfile, isLoading: profileLoading } = trpc.profile.me.useQuery(
    undefined,
    { 
      enabled: Boolean(user),
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    }
  );

  const isLoading = userLoading || (user && profileLoading);

  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      router.replace("/choose-role");
    } else if (!userProfile) {
      router.replace("/create-profile");
    }
  }, [isLoading, user, userProfile, router]);

  if (isLoading || !user || !userProfile) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <BaseProtectedContext.Provider value={{ user, userProfile }}>
      {children}
    </BaseProtectedContext.Provider>
  );
};

// FullyProtectedProvider - requires user + userProfile + eventProfile
export const FullyProtectedProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, userProfile } = useBaseProtected();
  const router = useRouter();

  const { data: eventProfile, isLoading: eventLoading } = trpc.eventProfile.me.useQuery(
    {},
    { 
      enabled: Boolean(user),
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (eventLoading) return;

    if (!eventProfile) {
      router.replace("/application");
    }
  }, [eventProfile, eventLoading, router]);

  if (eventLoading || !eventProfile) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <FullyProtectedContext.Provider value={{ user, userProfile, eventProfile }}>
      {children}
    </FullyProtectedContext.Provider>
  );
};