import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { useUser } from "@/hooks/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const AuthProtectedProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const { data: user, isLoading } = useUser();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/choose-role");
    }
  }, [user, isLoading, router]);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }

  // If user is authenticated, render the app
  if (user) {
    return <>{children}</>;
  }

  // If user is not authenticated (redirect will happen)
  return null;
};
