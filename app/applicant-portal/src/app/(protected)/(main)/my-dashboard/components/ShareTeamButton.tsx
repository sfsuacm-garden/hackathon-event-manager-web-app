'use client';

import { Button } from '@/components/shadcn/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/shadcn/ui/dialog';
import { Input } from '@/components/shadcn/ui/input';
import { Label } from '@/components/shadcn/ui/label';
import { Spinner } from '@/components/ui/shadcn-io/spinner';
import { Icons } from '@/lib/icons';
import { trpc } from '@/utils/trpc';
import { useState } from 'react';
import { toast } from 'sonner';

const INVITE_LINK_COOLDOWN_MS = 2000;

export default function ShareTeamButton({
  isTeamFull,
  isTeamManagementUnlocked
}: {
  isTeamFull: boolean;
  isTeamManagementUnlocked: boolean;
}) {
  const { refetch: fetchInviteToken, isFetching: isFetchingToken } =
    trpc.teams.getTeamInviteToken.useQuery(undefined, { enabled: false });

  const [inviteLink, setInviteLink] = useState('');
  const [isCooling, setIsCooling] = useState(false);
  const [open, setOpen] = useState(false);

  const handleGenerateLink = async () => {
    if (isFetchingToken || isCooling) return;

    try {
      setIsCooling(true);
      const { data: token } = await fetchInviteToken();
      if (!token) throw new Error('No token returned');
      const link = `${window.location.origin}/join/${token}`;
      setInviteLink(link);
      setOpen(true);

      toast.success('Team invite link is ready!');
    } catch (e) {
      console.error(e);
      toast.error('Error generating invite link.');
    } finally {
      setTimeout(() => setIsCooling(false), INVITE_LINK_COOLDOWN_MS);
    }
  };

  const handleCopy = () => {
    if (!inviteLink) return;
    navigator.clipboard.writeText(inviteLink);
    toast.success('Invite link copied to clipboard.');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          size="lg"
          className="w-full md:w-auto"
          onClick={handleGenerateLink}
          disabled={isTeamFull || !isTeamManagementUnlocked || isCooling || isFetchingToken}
        >
          {isFetchingToken || isCooling ? (
            <>
              <Spinner className="mr-2 h-4 w-4" />
              Generating...
            </>
          ) : (
            <>
              <Icons.mail /> Get Team Invite Link
            </>
          )}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Invite Team Member</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to join your team. This link will expire in 24
            hours.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-2 mt-4">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Team Invite Link
            </Label>
            <Input id="link" value={inviteLink} readOnly />
          </div>
          <Button variant="outline" onClick={handleCopy}>
            Copy
          </Button>
        </div>

        <DialogFooter className="sm:justify-start mt-4">
          <DialogClose asChild>
            <Button variant="secondary">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
