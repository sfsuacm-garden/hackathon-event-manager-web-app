"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import MemberPreview from "./components/MemberPreviewCard";
import { Separator } from "@radix-ui/react-separator";
import {
  Alert,
  AlertDescription,
} from "@/components/shadcn/ui/alert";
import { Icons } from "@/lib/icons";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import ErrorStateAlert from "../(main)/components/ErrorStateAlert"
import { trpc } from "@/utils/trpc";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useRouter } from "next/router";

export default function JoinPage() {
  const isUserOnTeam = true; // user is always on a team
  let joinTeamSuccess = false;

  const [error, setErrorStatus] = useState(false);

  const searchParams = useSearchParams();
  const teamIdToJoin = searchParams.get('teamId');

  const utils = trpc.useUtils();
  const router = useRouter();

  const {data: team, isPending: loading, error: newTeamFetchError } = trpc.teams.getTeamById.useQuery(
    {id: teamIdToJoin as string},
    {enabled: Boolean(teamIdToJoin)}
  );

  if(newTeamFetchError) {
    setErrorStatus(true);
  }

  const teamMemberCount = team?.members.length ?? 4;
  const isTeamFull = teamMemberCount >= 4;

  const  joinTeamMutation = trpc.teams.joinTeamById.useMutation({
    onError: () => {
      setErrorStatus(true);  
    },
    onSuccess: () => {
      utils.teams.getOwnTeam.invalidate();
      joinTeamSuccess = true;
      router.push('/my-dashboard'); // idk what to do here redirect user to team page or what?
    }
  });

  const handleJoinTeam = () => {
    if(teamIdToJoin && !joinTeamMutation.isPending && !error && !joinTeamSuccess) {
      joinTeamMutation.mutate({teamId: teamIdToJoin});
    }
  }

  //TODO enhance loading experience
  if (loading || joinTeamMutation.isPending) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <div className="flex items-center justify-center h-50">
            <Spinner />
          </div>
        </Card>
      </main>
    );
  }

  //TODO enhance the error experience. Currently, this will be used to indicate that a team is in valid and/or an error. Would be worth having a conversation to seperate the two.
  if (error) {
    // Determine error type for better messaging
    let isInvalidLink = false;
    let isServerError = false;
    
    if(newTeamFetchError) {
      isInvalidLink = true;
    }
    else {
      isServerError = true;
    }

    return (
      <main className="min-h-screen flex items-center justify-center p-4">
        <ErrorStateAlert
          title={{
            text: isInvalidLink ? "Invalid Team Invitation" : "Unable to Process Invitation",
          }}
          description={{
            text: 
              isInvalidLink 
                ? "This invitation link is invalid or has expired. Please ask your team leader to send you a new invitation."
                : isServerError
                ? "We're experiencing technical difficulties. Please try again later."
                : "Something went wrong while processing this team invitation. Please try again later."
          }}
          callToAction={{
            text: "Back to Dashboard",
            link: "/my-dashboard"
          }}
          variant="default"
        />
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        {!isTeamFull ? (
          <CardHeader>
            <CardTitle>
              <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                You are joining {team?.name}
              </h3>
            </CardTitle>
            <CardDescription>
              This means that your application to participate in SF Hacks 2026
              will be evaluated together.
            </CardDescription>
          </CardHeader>
        ) : (
          <CardHeader>
            <CardTitle>
              <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                {team?.name} is unable to accept new members.
              </h3>
            </CardTitle>
            <CardDescription>
              This team has hit max capacity and cannot accept anymore team
              members. Try joining another team.
            </CardDescription>
          </CardHeader>
        )}

        <CardContent className="flex flex-col gap-4">
          {isUserOnTeam && !isTeamFull && (
            <Alert variant={"default"}>
              <Icons.alert className="text-accent" />
              <AlertDescription className=" text-accent">
                <p>
                  It looks like you are currently already in a team. Joining{" "}
                  <b>{team?.name}</b> will
                  <span>
                    {" "}
                    <b>remove</b>{" "}
                  </span>
                  you from your previous team.
                </p>
              </AlertDescription>
            </Alert>
          )}
          {!isTeamFull && (
            <Card>
              <CardContent>
                <div className="flex gap-x-2 items-baseline">
                  <small className="text-sm leading-none font-semibold">
                    {team?.name} Team
                  </small>
                  <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                    {teamMemberCount}/{4}
                  </code>
                </div>
                {[...Array(2)].map((_, idx) => (
                  <>
                    <MemberPreview key={idx} />
                    <Separator />
                  </>
                ))}
              </CardContent>
            </Card>
          )}
          {!isTeamFull ? (
            <div className="space-x-2">
              <Button onClick={handleJoinTeam}>
                Join New Team
              </Button>
              <Button
                variant={"secondary"}
                onClick={() => router.push('/my-dashboard')}
              >
                Decline
              </Button>
            </div>
          ) : (
            <Button variant="outline">Back to Dashboard</Button>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
