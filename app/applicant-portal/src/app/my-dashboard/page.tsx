/**
 * My Dashboard Page
 *
 *
 */
import TeamView from "./components/TeamView";

export default function MyDashboardView() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto flex flex-col items-start justify-start gap-16">
        <div className="flex flex-col gap-4">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Application Status
          </h3>
          <p className="text-muted-foreground text-xl">
            Sit tight! Applications are still open. Feel free to find new
            teammates and encourage your friends to sign up here.
          </p>
        </div>

        <TeamView />
      </div>
    </main>
  );
}
