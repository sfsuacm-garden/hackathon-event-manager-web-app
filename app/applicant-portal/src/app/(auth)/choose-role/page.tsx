"use client";

import { useRouter } from "next/navigation";

import { Progress } from "@/components/shadcn/ui/progress";
import { Separator } from "@/components/shadcn/ui/separator";
import { RoleBlock } from "./components/RoleBlockCard";

export type Role = "hacker" | "judge" | "mentor";

export default function ChooseRolePage() {
  const router = useRouter();

  function handleRoleSelection(role: Role, url = "") {
    try {
      localStorage.setItem("pendingRole", role); // fallback
    } catch {}
    router.push(url ?? `/login?role=${encodeURIComponent(role)}`);
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-12">
      <div className="mb-8">
        <Progress value={10} className="h-2 rounded-full bg-muted" />
      </div>

      <h1 className="text-4xl font-extrabold tracking-tight">
        Be Apart of SF Hacks 2026
      </h1>
      <p className="mt-2 text-muted-foreground">
        February 14th @ Annex 1 | San Francisco State University
      </p>

      <div className="mt-8 space-y-10">
        <RoleBlock
          title="Participate as a Hacker!"
          body="Hackers at SF Hacks build innovative software projects, apps, or hardware solutions within a limited timeframe (typically 24–48 hours) by collaborating in teams to solve problems or create something new."
          onPrimary={() => handleRoleSelection("hacker")}
          primary="Sign up as a hacker"
          onSecondary={() => router.push("/login")}
          secondary="Log into Portal"
        />

        <Separator />

        <RoleBlock
          title="Participate as a Judge"
          body="Judges at SF Hacks evaluate each team's project based on specific criteria set by the organizers, assessing factors such as creativity, technical implementation, and user experience design to determine the winning projects."
          onPrimary={() =>
            //TODO: Add proper role selection link.
            handleRoleSelection("judge", "https://docs.google.com/forms/u/0/")
          }
          primary="Sign up for Judging"
        />

        <Separator />

        <RoleBlock
          title="Participate as a Mentor"
          body="Mentors at SF Hacks support teams by providing guidance on design, architecture, debugging, and product thinking so hackers can move faster and learn more."
          //TODO: Add proper role selection link.
          onPrimary={() =>
            handleRoleSelection("mentor", "https://docs.google.com/forms/u/0/")
          }
          primary="Sign up as a Mentor"
        />
      </div>
    </main>
  );
}
