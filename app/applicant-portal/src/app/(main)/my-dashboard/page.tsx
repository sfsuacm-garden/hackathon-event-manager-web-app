"use client";
/**
 * My Dashboard Page
 */

import { Skeleton } from "@/components/shadcn/ui/skeleton";
import TeamView from "./components/TeamView";
import { trpc } from "@/utils/trpc";
import ErrorState from "../components/ErrorState";

export default function MyDashboardView() {
  const { data, isLoading, error } = trpc.events.getById.useQuery({
    id: process.env.NEXT_PUBLIC_EVENT_ID || "",
  });

  if (error) {
    // Determine error type for better messaging
    const isNotFound = true;
    const isServerError = true;
    
    return (
      <main className="min-h-full flex items-center justify-center p-4">
        <ErrorState
          title={{
            text: isNotFound ? "Event Not Found" : "Unable to Load Dashboard",
            styling: "text-red-500 text-lg"
          }}
          description={{
            text:
              isNotFound 
                ? "The event you're looking for doesn't exist or has been removed."
                : isServerError
                ? "We're experiencing technical difficulties. Please try again later."
                : "Something went wrong while loading your dashboard."
          }}
          primary={{
            text: "Back to Home",
            link: "/"
          }}
          variant="default"
        />
      </main>
    );
  }
  const isTeamManagementUnlocked = data?.isTeamManagementOpen ?? false;

  return (
    <main className="min-h-1/2 flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto flex flex-col items-center gap-16">
        <div className="flex flex-col gap-2 items-center text-center">
          <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
            My Team
          </h3>
          <p>View and manage your application and your team.</p>
          {isLoading ? (
            <div>
              <Skeleton className="h-4 w-60 rounded mt-2" />
            </div>
          ) : (
            <div className="mt-4">
              {!isTeamManagementUnlocked ? (
                <p className="text-muted-foreground text-sm text-center">
                  Teams are locked. This means your application for seeing if…
                </p>
              ) : (
                <TeamView />
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
