/**
 * TeamView.tsx
 *
 * Displays the user's team information, including team lock-in time,
 * invite link, team members, and an option to leave the team.
 */
import React, { useState } from 'react'
import { Button } from "@/components/shadcn/ui/button";
import TeamMemberCard from "./MemberCard";
import { Icons } from "@/lib/icons";
import {
  Alert,
  AlertTitle,
  AlertDescription,
} from "@/components/shadcn/ui/alert";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { TEAM_MAX_MEMBERS } from "@/lib/constants";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/shadcn/ui/tooltip";
import { trpc } from "@/utils/trpc";
import ErrorStateAlert from "../../components/ErrorStateAlert";

export default function TeamView() {
  const utils = trpc.useUtils();
  const isTeamManagementUnlocked = false; // how are we going to handle this globally or should this become a middleware lmao 

  const {data: team, isLoading: loading, error} = trpc.teams.getOwnTeam.useQuery();
  const isTeamAdmin = team?.isTeamAdmin ?? false;
  const teamCount = team?.team.members.length ?? 0;
  const isTeam = teamCount > 1;
  const isTeamFull = teamCount > 3;

  const teamInviteLink = `${window.location.origin}/join?teamId=${team?.team.id}`

  const [showLeaveTeamMutationFailError, setLeaveTeamMutationFailError] = useState(false);

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

  const leaveTeamMutation = trpc.teams.leaveTeam.useMutation({
    onSuccess: ()=> {
      utils.teams.getOwnTeam.invalidate();
    },
    onError: () => {
      setLeaveTeamMutationFailError(true);
    }
  });

  const handleLeaveTeam = ()=> {
    //TODO: need to add a component for ARE YOU SURE dialogues
    leaveTeamMutation.mutate();
  }

  const handleCopyInviteLink = () => {
    //TODO: implement some sort of brief popup or something to indicate that the link was copied
    navigator.clipboard.writeText(teamInviteLink);
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
                onClick={handleCopyInviteLink}
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
          
          {team?.team.members.map((member, idx) => (
            <TeamMemberCard 
              key={idx}
              userId={member.userId}
              isTeamAdmin={member.isAdmin ?? false}
            />
          ))}

        </div>
      ) : (
        <div className="h-56 flex items-center justify-center w-full mx-auto">
          <Spinner />
        </div>
      )}

      {isTeam && !loading && !isTeamManagementUnlocked && (
        <Button variant="outline" size="lg" onClick={handleLeaveTeam}>
          <Icons.logOut /> Leave Team
        </Button>
      )}

      {showLeaveTeamMutationFailError && (
        <ErrorStateAlert 
          title={{text: 'Error leaving team'}}
          description={{text: 'There was an error leaving the team. Please try again or contact the team.'}}
        />
      )}
    </div>
  );
}
