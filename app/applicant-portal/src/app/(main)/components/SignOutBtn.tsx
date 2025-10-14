import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/shadcn/ui/alert-dialog";
import { useSignOut } from "@/hooks/auth";
import { useRouter } from "next/navigation";

export default function SignOutBtn() {
  const { mutate: signOutMutation } = useSignOut()
  const router = useRouter();

  const handleSignout = () => {
    signOutMutation(undefined, {
      onSuccess: () => {
        console.log("successfully signed out using signoutmutation")
        router.push("/")
      }
    })
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="btn btn-danger hover:cursor-pointer">Sign out</button>
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
          <AlertDialogAction className="hover:cursor-pointer"
            onClick={handleSignout}
          >
            Sign out
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}