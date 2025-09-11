"use client";
import { Avatar, AvatarImage } from "@/components/shadcn/ui/avatar";
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

export default function JoinPage() {
  var teamName = "TeamName01";

  const member = {
    name: "John Smith",
    email: "jsmith@sfsu.edu",
    joined: "April 2nd, 5:00pm",
    avatarUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe-UxhlswN7mS_tqXj0L9a00hL_NHisSSqn4Mm6FW8BuvQI_8wHrLG7pUlkvozlpwASp0&usqp=CAU",
    initials: 200,
  };
  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
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

        <CardContent className="flex flex-col gap-4">
          <Alert variant="default">
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
        </CardContent>
      </Card>
    </main>
  );
}
