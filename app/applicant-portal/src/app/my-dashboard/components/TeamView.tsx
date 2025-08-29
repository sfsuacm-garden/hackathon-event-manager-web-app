/**
 * TeamView.tsx
 *
 * Displays the user's team information, including team lock-in time,
 * invite link, team members, and an option to leave the team.
 */
import { Button } from "@/components/shadcn/ui/button";
import TeamMemberCard from "./MemberCard";
import { Icons } from "@/lib/icons";

export default function TeamView() {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex flex-col w-full justify-between md:flex-row md:items-end gap-2 ">
        <div>
          <p>Teams lock in</p>
          <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
            3 months 5 days and 4 hours
          </code>
        </div>
        <Button variant="secondary" size="lg" className="w-full md:w-auto">
          <Icons.copy /> Copy Invite Link
        </Button>
      </div>

      <div className="flex flex-col w-full gap-2">
        {[...Array(2)].map((_, idx) => (
          <TeamMemberCard key={idx} />
        ))}
      </div>
      <Button variant="outline" size="lg">
        <Icons.logOut /> Leave Team
      </Button>
    </div>
  );
}
