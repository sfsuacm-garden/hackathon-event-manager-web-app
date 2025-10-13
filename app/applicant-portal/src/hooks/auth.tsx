"use client";

import { useSupabaseAuth } from "@/providers/SupabaseAuthProvider";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

type Role = "hacker" | "judge" | "mentor";

interface SignupData {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  dob?: string;
  role: Role;
}

interface UseSendOtpOptions {
  signupData?: SignupData;
  onSuccess?: () => void;
}

export function useSendOtp(
  email: string,
  mode: "login" | "signup" | "resend" = "login",
  options: UseSendOtpOptions = {}
) {
  const auth = useSupabaseAuth();
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      const trimmedEmail = email.trim();
      if (!trimmedEmail) throw new Error("Enter your email");

      const { data: _, error } = await auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: mode === "signup",
          data:
            mode === "signup"
              ? {
                  first_name: options.signupData?.firstName,
                  last_name: options.signupData?.lastName,
                  full_name: `${options.signupData?.firstName} ${options.signupData?.lastName}`,
                  phone_number: options.signupData?.phoneNumber,
                  dob: options.signupData?.dob,
                }
              : undefined,
        },
      });

      if (error) throw new Error(error.message);
      return true;
    },
    onError: (err) => {
      console.error(err);
      return err.message;
    },
    onSuccess: () => {
      if (mode === "resend") {
        if (options.onSuccess) {
          options.onSuccess();
        }
      } else {
        router.push(
          `/verify-otp?email=${encodeURIComponent(email)}&auth=${mode}`
        );
      }
    },
  });
}

export const useUser = () => {
  const auth = useSupabaseAuth();

  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const {
        data: { session },
      } = await auth.getSession();
      return session?.user ?? null;
    },
    staleTime: Infinity,
  });
};

export const useSignOut = () => {
  const auth = useSupabaseAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const { error } = await auth.signOut();
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.clear();
      queryClient.setQueryData(["user"], null);
    },
  });
};
