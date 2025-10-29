import { useUser } from '@/hooks/auth';
import extractEmailDomain from '@/utils/extractEmailDomain';
import { trpc } from '@/utils/trpc';
import { useEffect, useMemo, useState } from 'react';

export function usePrepopulateSchoolFieldDropwdownSelection() {
  const { user, isLoading } = useUser();

  const [schoolSelection, setSchoolSelection] = useState<{
    value: string;
    label: string;
  } | null>(null);
  // Extract domain from user email
  const userEmailDomain = useMemo(() => {
    if (isLoading || !user?.email) return null;
    const domain = extractEmailDomain(user.email);
    return domain?.endsWith('.edu') ? domain : null;
  }, [user?.email, isLoading]);

  // Query school by email domain
  const {
    data: school,
    isLoading: isSchoolLoading,
    error: schoolError
  } = trpc.schools.getByEmailDomain.useQuery(
    { domain: userEmailDomain! },
    {
      enabled: Boolean(userEmailDomain),
      retry: false
    }
  );

  useEffect(() => {
    if (school) {
      setSchoolSelection({ value: school.id, label: school.id });
    }

    if (schoolError) {
      console.warn('Could not find school for domain:', userEmailDomain);
    }
  }, [school, schoolError, userEmailDomain]);

  return {
    schoolSelection,
    isLoadingSchool: isSchoolLoading || isLoading,
    userEmailDomain,
    schoolError
  };
}
