"use client";

import { useSupabase } from "@/context/SupabaseContext";
import { useMutation } from "@tanstack/react-query";
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
  const supabase = useSupabase();
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      const trimmedEmail = email.trim();
      if (!trimmedEmail) throw new Error("Enter your email");

      const { data: _, error } = await supabase.auth.signInWithOtp({
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
