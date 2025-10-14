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

// branch off of frontend/auth (akim's branch, or the one in the notion (feature/auth-flow)) to add the sign out functionality
// note provider in root layout
// they're using hooks/provider or something
// check where useUser is, where its being defined and use this instead of supabase sign out function
export default function SignOutBtn() {
  const handleSignout = () => {
    console.log("handle sign out called")
  }

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