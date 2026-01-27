'use client';
import { useUser } from '@/hooks/auth';
import { trpc } from '@/utils/trpc';
import { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import nProgress from 'nprogress';
import { createContext, useContext, useEffect } from 'react';
import { toast } from 'sonner';

interface BaseProtectedContextValue {
  user: User | null;
  userProfile: ReturnType<typeof trpc.profile.me.useQuery>['data'];
}

interface FullyProtectedContextValue extends BaseProtectedContextValue {
  eventProfile: ReturnType<typeof trpc.eventProfile.me.useQuery>['data'];
}

const BaseProtectedContext = createContext<BaseProtectedContextValue | undefined>(undefined);
const FullyProtectedContext = createContext<FullyProtectedContextValue | undefined>(undefined);

export const useBaseProtected = () => {
  const ctx = useContext(BaseProtectedContext);
  if (!ctx) throw new Error('useBaseProtected must be used within BaseProtectedProvider');
  return ctx;
};

export const useFullyProtected = () => {
  const ctx = useContext(FullyProtectedContext);
  if (!ctx) throw new Error('useFullyProtected must be used within FullyProtectedProvider');
  return ctx;
};

export const AuthOnlyProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { user, isLoading: userLoading } = useUser();

  useEffect(() => {
    if (userLoading) {
      nProgress.start();
    } else {
      nProgress.done();
    }

    if (!userLoading && !user) {
      router.replace('/choose-role');
    }

    return () => {
      nProgress.done();
    };
  }, [userLoading, user, router]);

  if (userLoading || !user) {
    return null;
  }

  return <>{children}</>;
};

/*  BaseProtectedProvider - requires user + userProfile only (for application page) */
export const BaseProtectedProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { user, isLoading: userLoading } = useUser();

  const { data: userProfile, isLoading: profileLoading } = trpc.profile.me.useQuery(undefined, {
    enabled: Boolean(user),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false
  });

  const isLoading = userLoading || (user && profileLoading);

  useEffect(() => {
    if (isLoading) {
      nProgress.start();
    } else {
      nProgress.done();
    }

    if (!isLoading) {
      if (!user) {
        router.replace('/choose-role');
      } else if (!userProfile) {
        router.replace('/create-profile');
      }
    }

    return () => {
      nProgress.done();
    };
  }, [isLoading, user, userProfile, router]);

  if (isLoading || !user || !userProfile) {
    return null;
  }

  return (
    <BaseProtectedContext.Provider value={{ user, userProfile }}>
      {children}
    </BaseProtectedContext.Provider>
  );
};

//  FullyProtectedProvider - requires user + userProfile + eventProfile
export const FullyProtectedProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, userProfile } = useBaseProtected();
  const router = useRouter();

  const { data: eventProfile, isLoading: eventLoading } = trpc.eventProfile.me.useQuery(
    {},
    {
      enabled: Boolean(user),
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false
    }
  );

  useEffect(() => {
    if (eventLoading) {
      nProgress.start();
    } else {
      nProgress.done();
    }

    if (!eventLoading && !eventProfile) {
      router.replace('/application');
    }

    return () => {
      nProgress.done();
    };
  }, [eventLoading, eventProfile, router]);

  if (eventLoading || !eventProfile) {
    return null;
  }

  return (
    <FullyProtectedContext.Provider value={{ user, userProfile, eventProfile }}>
      {children}
    </FullyProtectedContext.Provider>
  );
};

export const TeamManagementProtectedProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const { data: event, isLoading: eventLoading, error: eventError } = trpc.events.me.useQuery();

  // Handle error
  useEffect(() => {
    if (eventError) {
      toast.error('There was an error retrieving this event information. Refresh the page.');
    }
  }, [eventError]);

  // Handle redirect
  useEffect(() => {
    if (!eventLoading && event && !event.isTeamManagementOpen) {
      router.replace('/closed');
    }
  }, [eventLoading, event, router]);

  if (eventLoading || eventError) {
    return null;
  }

  if (!event?.isTeamManagementOpen) {
    return null;
  }

  return <>{children}</>;
};
