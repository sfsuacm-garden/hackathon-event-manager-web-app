"use client";
/**
 * My Dashboard Page
 *
 *
 */

import { Skeleton } from "@/components/shadcn/ui/skeleton";
import TeamView from "./components/TeamView";
import { useQuery } from "@tanstack/react-query";
import { trpc } from "@/utils/trpc";

export default function MyDashboardView() {
  const { data, isLoading, error } = trpc.events.getById.useQuery({
    id: process.env.EVENT_ID || "",
  });

  // TODO There needs to be an error and a loading state for this page.
  if (error) {
    return;
  }

  const loading = false;
  const isTeamManagementUnlocked = data?.isTeamManagementOpen;
  return (
    <main className="min-h-1/2 flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto flex flex-col items-center gap-16">
        <div className="flex flex-col gap-2 items-center text-center">
          <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
            My Team
          </h3>
          <p>View and manage your application and your team.</p>
          {loading ? (
            <div>
              <Skeleton className="h-4 w-60 rounded mt-2" />
            </div>
          ) : (
            <div className="mt-4">
              {!isTeamManagementUnlocked ? (
                <p className="text-muted-foreground text-sm text-center">
                  Teams are locked. This means your application for seeing if
                  you can join the hackathon cannot be changed. This does not
                  mean you can not meet new people and change your team during
                  the hackathon.
                </p>
              ) : (
                <div className="flex flex-col gap-2 items-center ">
                  <small className="text-sm leading-none font-medium">
                    Team moving locks in
                  </small>
                  <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                    3 months 5 days and 4 hours
                  </code>
                </div>
              )}
            </div>
          )}
        </div>

        <TeamView />
      </div>
    </main>
  );
}
