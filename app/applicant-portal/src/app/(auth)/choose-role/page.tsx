'use client';

import { useRouter } from 'next/navigation';

import EventHeader from '@/components/ui/event-header';
import { Icons } from '@/lib/icons';
import { RoleBlock } from './components/RoleBlockCard';

// TODO Currently roles are not being used. Would be good for future functionality.
export type Role = 'hacker' | 'judge' | 'mentor';

export default function ChooseRolePage() {
  const router = useRouter();

  function handleRoleSelection(role: Role, url = '') {
    try {
      localStorage.setItem('pendingRole', role); // fallback
    } catch {}
    router.push(url ?? `/auth`);
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-6 ">
      <EventHeader />
      <div className="mt-8 space-y-4">
        <RoleBlock
          title="Participate as a Hacker!"
          body="Hackers at SF Hacks build innovative software projects, apps, or hardware solutions within a limited timeframe (typically 24–48 hours) by collaborating in teams to solve problems or create something new."
          onPrimary={() => handleRoleSelection('hacker', '/authenticate')}
          primary="Sign up as a hacker"
          Icon={Icons.code}
        />
        <RoleBlock
          title="Participate as a Judge"
          body="Judges at SF Hacks evaluate each team's project based on specific criteria set by the organizers, assessing factors such as creativity, technical implementation, and user experience design to determine the winning projects."
          onPrimary={() =>
            //TODO: Add proper role selection link.
            handleRoleSelection('judge', 'https://tally.so/r/GxxKpL')
          }
          primary="Sign up for Judging"
          Icon={Icons.gavel}
          />

        {/* FOR FUTURE Launch
        <RoleBlock
          title="Participate as a Mentor"
          body="Mentors at SF Hacks support teams by providing guidance on design, architecture, debugging, and product thinking so hackers can move faster and learn more."
          //TODO: Add proper role selection link.
          onPrimary={() => handleRoleSelection('mentor', 'https://docs.google.com/forms/u/0/')}
          primary="Sign up as a Mentor"
          Icon={Icons.help}
        /> */}
      </div>
    </main>
  );
}
