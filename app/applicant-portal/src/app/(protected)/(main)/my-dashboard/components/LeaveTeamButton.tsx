import { useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/shadcn/ui/dialog';
import { Button } from '@/components/ui/button';
import { Icons } from '@/lib/icons';

export default function LeaveTeamButton({ handleLeaveTeam }: { handleLeaveTeam: () => void }) {
const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="lg"
          className="w-full md:w-auto"
        >
          <Icons.logOut /> Leave Team
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Are you sure you want to leave this team?</DialogTitle>
        </DialogHeader>
        <DialogFooter className="sm:justify-start mt-4">
          <Button variant="default" size="lg" onClick={handleLeaveTeam}>Yes</Button>
          <DialogClose asChild>
              <Button variant="outline" size="lg">No</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}