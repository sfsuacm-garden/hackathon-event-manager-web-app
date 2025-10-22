"use client";

import { useSendOtpMutation, useVerifyOtp } from "@/hooks/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function useOtpVerification(email: string) {
  const [otp, setOtp] = useState("");
  const [showResendAlert, setShowResendAlert] = useState(false);
  const router = useRouter();


  const messages = {
    title: "Verify your email",
    description: `Enter the 6-digit code sent to ${email}`,
    buttonText: "Verify",
    resendText: "Resend code",
    renavigateText: "Back",
  };

  const onVerifySuccess = () => {
    router.push("/my-dashboard");
  };

  const onResendSuccess = () => {
    setShowResendAlert(true);
  };


  const {
    mutate: verifyOtp,
    isPending: isVerifying,
    isError: isVerifyError,
    error: verifyError,
  } = useVerifyOtp(email, onVerifySuccess);

  const {
    mutate: resendOtp,
    isPending: isResending,
    isError: isResendError,
    error: resendError,
  } = useSendOtpMutation(() => {setShowResendAlert(true)}, () => {setShowResendAlert(true)});

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedOtp = otp.trim();

    if (!trimmedOtp) return alert("Please enter the 6-digit code");
    if (trimmedOtp.length !== 6 || /\D/.test(trimmedOtp))
      return alert("OTP must be 6 digits");

    verifyOtp(trimmedOtp);
  };
  
  const handleResend = (e: React.FormEvent) => {
    e.preventDefault();
    resendOtp(email);
  };

  const onRenavigate = () => {
    router.back(); // more generic now that there's no auth flow distinction
  };
  

  return {
    otp,
    setOtp,
    showResendAlert,
    setShowResendAlert,
    handleVerify,
    handleResend,
    isVerifying,
    isVerifyError,
    verifyError,
    isResending,
    isResendError,
    resendError,
    messages,
    onRenavigate,
  };
}