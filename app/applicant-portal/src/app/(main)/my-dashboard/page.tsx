/**
 * My Dashboard Page
 *
 *
 */

import TeamView from "./components/TeamView";

export default function MyDashboardView() {
  return (
    <main className="min-h-1/2 flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto flex flex-col items-start justify-start gap-16">
        <div className="flex flex-col gap-2">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            My Dashboard
          </h3>
          <p className="text-muted-foreground text-xl">
            View the status of your application and your team.
          </p>
        </div>

        <TeamView />
      </div>
    </main>
  );
}
