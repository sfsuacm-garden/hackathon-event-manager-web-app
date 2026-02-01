'use client';

import { Button } from '@/components/ui/button';

export default function ClosedPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col items-center justify-center px-6 text-center">
      <div className="translate-y-12 flex flex-col items-center">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
          Unfortunately applications are closed for SF Hacks 2026.
        </h1>

        <p className="mt-3 text-sm text-muted-foreground">
          Decisions will be out in the following weeks.
        </p>

        <Button asChild className="mt-6 bg-[#5865F2] text-white hover:bg-[#4752C4]">
          <a href="https://discord.gg/YOUR_INVITE" target="_blank" rel="noopener noreferrer">
            Join our Discord for Updates!
          </a>
        </Button>
        <Button asChild className="mt-6  " variant={'outline'}>
          <a href="/my-dashboard" target="_blank" rel="noopener noreferrer">
            Check Application Status Here
          </a>
        </Button>
      </div>
    </main>
  );
}
