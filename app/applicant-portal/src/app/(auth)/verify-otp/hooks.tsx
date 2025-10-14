"use client";

import { useSupabaseAuth } from "@/providers/SupabaseAuthProvider";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSendOtp } from "../../../hooks/auth";

function useVerifyOtp(
  email: string,
  onVerifySuccess: () => void | Promise<void>
) {
  const auth = useSupabaseAuth();

  return useMutation({
    mutationFn: async (otp: string) => {
      if (!otp || otp.length < 6) throw new Error("Enter the 6-digit code");

      const { data, error } = await auth.verifyOtp({
        email,
        token: otp,
        type: "email",
      });

      if (error) throw error.message;
      if (!data.user) throw "No user found.";

      return data.user;
    },
    onSuccess: async () => {
      await onVerifySuccess();
    },
    onError: (err) => {
      console.error(err);
      return err.message;
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
    router.push(`/dashboard`);
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
