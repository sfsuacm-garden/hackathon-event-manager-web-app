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
import { Spinner } from "@/components/ui/shadcn-io/spinner";

export default function TeamView() {
  const error = false;
  const loading = false;
  const isTeamFull = false;
  const isTeamEmpty = false;
  const isTeamAdmin = true;
  const isTeamManagementUnlocked = false;

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
        <p>Your Team</p>
        {(isTeamManagementUnlocked || !loading) && (
          <Button
            variant="secondary"
            size="lg"
            className="w-full md:w-auto"
            disabled={isTeamFull}
          >
            <Icons.copy /> Copy Invite Link
          </Button>
        )}
      </div>
      {!loading ? (
        <div className="flex flex-col w-full gap-2">
          {[...Array(2)].map((_, idx) => (
            <TeamMemberCard key={idx} userId={""} isTeamAdmin={isTeamAdmin} />
          ))}
        </div>
      ) : (
        <div className="h-56 flex items-center justify-center w-full mx-auto">
          <Spinner />
        </div>
      )}

      {!isTeamEmpty && !loading && !isTeamManagementUnlocked && (
        <Button variant="outline" size="lg">
          <Icons.logOut /> Leave Team
        </Button>
      )}
    </div>
  );
}
