"use client";

import { OtpErrorType } from "@/app/(onboarding)/application/types";
import { useSupabaseAuth } from "@/providers/SupabaseAuthProvider";
import { trpc } from "@/utils/trpc";
import { User } from "@supabase/supabase-js";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSendOtp, useSignupData } from "../../../hooks/auth";


//TODO This hook should be moved over to the auth.tsx.
export function useVerifyOtp(
  email: string,
  onVerifySuccess: () => void | Promise<void>
) {
  const auth = useSupabaseAuth();
  const createProfile = trpc.profile.create.useMutation();
  const { getSignupData, clearSignupData } = useSignupData();

  return useMutation<
    User,            
    OtpErrorType,    
    string            
  >({
    mutationFn: async (otp: string) => {
      if (!otp || otp.length < 6)
        throw { type: "INVALID_OTP", message: "Enter the 6-digit code" };

      const { data, error } = await auth.verifyOtp({
        email,
        token: otp,
        type: "email",
      });

      if (error) {
        console.error("❌ OTP verification failed:", error);
        throw { type: "VERIFY_FAIL", message: error.message ?? "OTP verification failed" };
      }

      if (!data.user)
        throw { type: "NO_USER", message: "No user found." };

      if (data.session) {
        await auth.setSession(data.session);
      }
      

      //TODO The verify step should be moved to a TRPC route
      // because of the create profile step.
      const signUpData = getSignupData();
      if (signUpData) {
        try {
          await createProfile.mutateAsync(signUpData);
          clearSignupData();
        } catch (err) {
          console.error("❌ Failed to create profile:", err);
          throw { type: "PROFILE_FAIL", message: "Failed to set up user profile" };
        }
      }

      return data.user;
    },

    onSuccess: async () => {
      await onVerifySuccess();
    },

    onError: (err) => {
      // ✅ `err` is now type `OtpErrorType`
      switch (err.type) {
        case "INVALID_OTP":
          console.error("Invalid code:", err.message);
          break;
        case "VERIFY_FAIL":
          console.error("Verification failed:", err.message);
          break;
        case "PROFILE_FAIL":
          console.error("Profile creation failed:", err.message);
          break;
      }
    },
  });
}

export function useOtpVerification(
  email: string,
  authFlow: "signup" | "login" | null
) {
  const [otp, setOtp] = useState("");
  const router = useRouter();
  const [showResendAlert, setShowResendAlert] = useState(false);

  const isSignup = authFlow === "signup";

  const messages = {
    title: isSignup
      ? "Verify your email to create your account"
      : "Enter your verification code",
    description: isSignup
      ? "We've sent a 6-digit code to your email to complete your registration."
      : `Enter the 6-digit code sent to ${email} `,
    buttonText: isSignup ? "Verify & Create Account" : "Verify & Login",
    resendText: isSignup ? "Didn't receive the code? Resend" : "Resend code",
    renavigateText: isSignup ? "Back to signup" : "Back to login",
  };

  const onVerifySuccess: () => void = () => {
    router.push(`/my-dashboard`);
  };

  const onResendSuccess: () => void = () => {
    setShowResendAlert(true);
  };

  const {
    mutate: verifyOtp, // The function to call the mutation
    isPending: isVerifyOtpPending, // Boolean: true when the verification is
    isError: isVerifyOtpError,
    error: verifyOtpError,
  } = useVerifyOtp(email, onVerifySuccess);

  const {
    mutate: resendOtp,
    isPending: isresendOtpPending,
    isError: isResendOtpError,
    error: resendOtpError,
  } = useSendOtp(email, "resend", { onSuccess: onResendSuccess });

  const handleVerify = (e: React.FormEvent) => {
    // Trim and validate OTP
    const trimmedOtp = otp.trim();

    if (!trimmedOtp) {
      alert("Please enter the 6-digit code"); // or set an error state
      return;
    }

    if (trimmedOtp.length !== 6 || /\D/.test(trimmedOtp)) {
      alert("OTP must be 6 digits");
      return;
    }

    e.preventDefault();
    verifyOtp(otp); // otp is your input state
  };

  const handleResend = (_: React.FormEvent) => {
    resendOtp();
  };

  const onRenavigate = () => {
    const route = isSignup ? `/signup` : `/login`;
    router.push(route);
  };

  return {
    otp,
    setOtp,
    showResendAlert,
    setShowResendAlert,
    handleVerify,
    isVerifyOtpPending,
    isVerifyOtpError,
    verifyOtpError,
    resendOtp,
    isresendOtpPending,
    isResendOtpError,
    resendOtpError,
    handleResend,
    messages,
    onRenavigate,
  };
}
