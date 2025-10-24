import { Spinner } from '@/components/ui/shadcn-io/spinner';
import { Suspense } from 'react';
import { VerifyOtpPage } from './components/VerifyOTPPage';

type VerifyOtpPageProps = {
  searchParams: Promise<{
    email?: string;
  }>;
};

export default async function VerifyOtp({ searchParams }: VerifyOtpPageProps) {
  const params = await searchParams;
  const email = params?.email ?? '';

  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen">
          <Spinner />
        </div>
      }
    >
      <VerifyOtpPage email={email} />
    </Suspense>
  );
}
