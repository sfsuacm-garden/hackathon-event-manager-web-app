import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/shadcn/ui/alert-dialog';
import { navigationMenuTriggerStyle } from '@/components/shadcn/ui/navigation-menu';
import { useSignOut } from '@/hooks/auth';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function SignOutBtn() {
  const { mutate: signOutMutation } = useSignOut();
  const router = useRouter();

  const handleSignout = () => {
    signOutMutation(undefined, {
      onSuccess: () => {
        toast('You have successfully signed out...');
        router.push('/');
      }
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className={`${navigationMenuTriggerStyle()} hover:cursor-pointer`}>Sign out</button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Sign out</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to sign out? You will need to log in again to access your account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="hover:cursor-pointer">Cancel</AlertDialogCancel>
          <AlertDialogAction className="hover:cursor-pointer" onClick={handleSignout}>
            Sign out
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
