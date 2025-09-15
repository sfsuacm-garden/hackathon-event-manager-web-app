'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/shadcn/ui/button';
import { Separator } from '@/components/shadcn/ui/separator';
import { Progress } from '@/components/shadcn/ui/progress';

const ROLES = ['hacker', 'judge', 'mentor'] as const;
type Role = typeof ROLES[number];

export default function ChooseRolePage() {
  const router = useRouter();

  function gotoAuth(role: Role) {
    try {
      localStorage.setItem('pendingRole', role); // I keep it as a fallback
    } catch {}
    // Route groups like (auth) are not part of the URL; the path is just /login
    router.push(`/login?role=${encodeURIComponent(role)}`);
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-12">
      <div className="mb-8">
        <Progress value={10} className="h-2 rounded-full bg-muted" />
      </div>

      <h1 className="text-4xl font-extrabold tracking-tight">Be Apart of SF Hacks 2026</h1>
      <p className="mt-2 text-muted-foreground">
        February 14th @ Annex 1 | San Francisco State University
      </p>

      <div className="mt-8 space-y-10">
        <RoleBlock
          title="Participate as a Hacker!"
          body="Hackers at SF Hacks build innovative software projects, apps, or hardware solutions within a limited timeframe (typically 24–48 hours) by collaborating in teams to solve problems or create something new."
          onPrimary={() => gotoAuth('hacker')}
          primary="Sign up as a hacker"
          onSecondary={() => router.push('/login')}
          secondary="Log into Portal"
        />

        <Separator />

        <RoleBlock
          title="Participate as a Judge"
          body="Judges at SF Hacks evaluate each team's project based on specific criteria set by the organizers, assessing factors such as creativity, technical implementation, and user experience design to determine the winning projects."
          onPrimary={() => gotoAuth('judge')}
          primary="Sign up for Judging"
        />

        <Separator />

        <RoleBlock
          title="Participate as a Mentor"
          body="Mentors at SF Hacks support teams by providing guidance on design, architecture, debugging, and product thinking so hackers can move faster and learn more."
          onPrimary={() => gotoAuth('mentor')}
          primary="Sign up as a Mentor"
        />
      </div>
    </main>
  );
}

function RoleBlock({
  title,
  body,
  onPrimary,
  primary,
  onSecondary,
  secondary,
}: {
  title: string;
  body: string;
  onPrimary: () => void;
  primary: string;
  onSecondary?: () => void;
  secondary?: string;
}) {
  return (
    <Card>
      <CardContent className="space-y-4 p-6">
        <div className="space-y-2">
          <h2 className="text-base font-semibold">{title}</h2>
          <p className="text-sm text-muted-foreground">{body}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button onClick={onPrimary}>{primary}</Button>
          {onSecondary && secondary ? (
            <Button variant="secondary" onClick={onSecondary}>
              {secondary}
            </Button>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}