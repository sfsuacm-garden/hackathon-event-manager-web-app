"use client";

import { useUser } from "@/hooks/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const AuthProtectedProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const user = useUser();

  useEffect(() => {
    if (!user) {
      router.push("/choose-role");
    }
  }, [user, router]);

  // If user is authenticated, render the app
  if (user) {
    return <>{children}</>;
  }

  // If user is not authenticated (redirect will happen)
  return null;
};
