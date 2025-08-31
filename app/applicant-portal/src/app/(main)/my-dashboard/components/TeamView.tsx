/**
 * TeamView.tsx
 *
 * Displays the user's team information, including team lock-in time,
 * invite link, team members, and an option to leave the team.
 */
import { Button } from "@/components/shadcn/ui/button";
import TeamMemberCard from "./MemberCard";
import { Icons } from "@/lib/icons";
import {
  Alert,
  AlertTitle,
  AlertDescription,
} from "@/components/shadcn/ui/alert";
import { Skeleton } from "@/components/shadcn/ui/skeleton";
import { Spinner } from "@/components/ui/shadcn-io/spinner";

export default function TeamView() {
  const error = false;
  const loading = false;
  const isTeamFull = false;
  const isTeamEmpty = false;
  const isTeamAdmin = false;

  if (error) {
    return (
      <Alert variant="default">
        <Icons.alert />
        <AlertTitle>
          Uh oh! there was an unexpected error getting your team information.
        </AlertTitle>
        <AlertDescription>
          Reload the page again or contact the team.{" "}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex flex-col w-full justify-between md:flex-row md:items-end gap-2 ">
        <div>
          {loading ? (
            <div>
              <Skeleton className="h-4 w-40 rounded" />

              <Skeleton className="h-4 w-60 rounded mt-2" />
            </div>
          ) : (
            <div>
              <p>Teams lock in</p>
              <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                3 months 5 days and 4 hours
              </code>
            </div>
          )}
        </div>

        <Button
          variant="secondary"
          size="lg"
          className="w-full md:w-auto"
          disabled={isTeamFull || loading}
        >
          <Icons.copy /> Copy Invite Link
        </Button>
      </div>
      {!loading ? (
        <div className="flex flex-col w-full gap-2">
          {[...Array(2)].map((_, idx) => (
            <TeamMemberCard
              key={idx}
              userId={""}
              isTeamMemberOwner={isTeamAdmin}
            />
          ))}
        </div>
      ) : (
        <div className="h-56 flex items-center justify-center w-full mx-auto">
          <Spinner />
        </div>
      )}

      {!isTeamEmpty && !loading && (
        <Button variant="outline" size="lg">
          <Icons.logOut /> Leave Team
        </Button>
      )}
    </div>
  );
}
