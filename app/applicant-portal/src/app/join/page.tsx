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
  AlertTitle,
} from "@/components/shadcn/ui/alert";
import { Icons } from "@/lib/icons";
import { Spinner } from "@/components/ui/shadcn-io/spinner";

export default function JoinPage() {
  const isUserOnTeam = true;
  const isTeamFull = true;
  const teamName = "TeamName01";
  const isLoading = false;
  const error = false;

  //TODO enhance loading experience
  if (isLoading) {
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
    return (
      <main className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md">
          <Alert variant="default">
            <Icons.alert />
            <AlertTitle>
              Uh oh! there was an unexpected error getting this invite.
            </AlertTitle>
            <AlertDescription>Try again with a new team link.</AlertDescription>
          </Alert>
        </div>
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
                You are joining {teamName}
              </h3>
            </CardTitle>
            <CardDescription>
              This means that your application to participate in SF Hacks 2026
              will be evualated together.
            </CardDescription>
          </CardHeader>
        ) : (
          <CardHeader>
            <CardTitle>
              <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                {teamName} is unable to accept new members.
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
                  <b>{teamName}</b> will
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
                    {teamName} Team
                  </small>
                  <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                    {1}/{4}
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
              <Button onClick={() => alert("Hello from shadcn!")}>
                Join New Team
              </Button>
              <Button
                variant={"secondary"}
                onClick={() => alert("Hello from shadcn!")}
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
