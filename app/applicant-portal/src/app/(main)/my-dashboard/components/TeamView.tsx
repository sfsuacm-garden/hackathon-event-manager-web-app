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
import { Separator } from "@/components/shadcn/ui/separator";
import { TEAM_MAX_MEMBERS } from "@/lib/constants";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/shadcn/ui/tooltip";

export default function TeamView() {
  const error = false;
  const loading = false;
  const isTeamAdmin = true;
  const isTeamManagementUnlocked = false;
  const teamCount = 4;
  const isTeam = teamCount > 1;
  const isTeamFull = teamCount > 3;

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
        <div className="flex gap-x-2 items-baseline">
          <small className="text-sm leading-none font-medium">Your Team</small>
          <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
            {teamCount}/{TEAM_MAX_MEMBERS}
          </code>
        </div>

        {/* TODO Currently, the tooltip does not appear when the button is
        disabled. The tooltip should appear on hover when the button is
        disabled. */}
        <Tooltip>
          <TooltipTrigger asChild>
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
          </TooltipTrigger>

          {isTeamFull && (
            <TooltipContent>
              <span>{isTeamFull ? "Team is full" : "Copy invite link"}</span>
            </TooltipContent>
          )}
        </Tooltip>
      </div>
      {!loading ? (
        <div className="flex flex-col w-full gap-2">
          {[...Array(teamCount)].map((_, idx) => (
            <TeamMemberCard key={idx} userId={""} isTeamAdmin={isTeamAdmin} />
          ))}
        </div>
      ) : (
        <div className="h-56 flex items-center justify-center w-full mx-auto">
          <Spinner />
        </div>
      )}

      {!isTeam && !loading && !isTeamManagementUnlocked && (
        <Button variant="outline" size="lg">
          <Icons.logOut /> Leave Team
        </Button>
      )}
    </div>
  );
}
