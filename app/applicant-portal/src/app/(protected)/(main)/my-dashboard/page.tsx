'use client';
/**
 * My Dashboard Page
 */

import { trpc } from '@/utils/trpc';
import ErrorStateAlert from '../components/ErrorStateAlert';
export default function MyDashboardView() {
  // ✅ All hooks at the top
  const { error } = trpc.events.getById.useQuery({
    id: process.env.NEXT_PUBLIC_EVENT_ID || ''
  });
  // ✅ Conditional rendering after all hooks
  if (error) {
    const isNotFound = false;
    const isServerError = true;

    return (
      <main className="min-h-full flex items-center justify-center p-4">
        <ErrorStateAlert
          title={{
            text: isNotFound ? 'Event Not Found' : 'Unable to Load Dashboard'
          }}
          description={{
            text: isNotFound
              ? "The event you're looking for doesn't exist or has been removed."
              : isServerError
                ? "We're experiencing technical difficulties. Please try again later."
                : 'Something went wrong while loading your dashboard.'
          }}
          callToAction={{
            text: 'Back to Home',
            link: '/'
          }}
          variant="default"
        />
      </main>
    );
  }

  return (
    <main className="min-h-1/2 flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto flex flex-col items-center gap-16">
        <div className="flex flex-col gap-2 items-center text-center">
          <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">My Team</h3>
          <p>View and manage your application and your team.</p>
        </div>
      </div>
    </main>
  );
}
