'use client';

import { useSendOtpMutation, useVerifyOtp } from '@/hooks/auth';
import { getErrorMessage } from '@/utils/getErrorMessage';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function useOtpVerification(email: string) {
  const [otp, setOtp] = useState('');
  const [showResendAlert, setShowResendAlert] = useState(false);
  const router = useRouter();

  const messages = {
    title: 'Verify your email',
    description: `Enter the 6-digit code sent to ${email}`,
    buttonText: 'Verify',
    resendText: 'Resend code',
    renavigateText: 'Back'
  };

  const onVerifySuccess = () => {
    router.push('/my-dashboard');
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onVerifyError = (err: any) => {
    console.error('Failed to verify OTP:', err);

    const errorMessages: Record<string, string> = {
      INVALID_OTP: 'Invalid verification code. Please check and try again.',
      VERIFY_FAIL: 'Verification failed. Please try again.',
      PROFILE_FAIL: 'Unable to create your profile. Please try again.'
    };

    const message =
      errorMessages[err.type] ||
      getErrorMessage(err, 'Unable to verify your code. Please try again.');

    throw new Error(message);
  };

  const onResendSuccess = () => {
    setShowResendAlert(true);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onResendError = (err: any) => {
    console.error('Failed to resend OTP:', err);

    throw new Error(
      getErrorMessage(err, 'Unable to resend verification code. Please try again in a moment.')
    );
  };

  const {
    mutate: verifyOtp,
    isPending: isVerifying,
    isError: isVerifyError,
    error: verifyError
  } = useVerifyOtp(email, onVerifySuccess, onVerifyError);

  const {
    mutate: resendOtp,
    isPending: isResending,
    isError: isResendError,
    error: resendError
  } = useSendOtpMutation(onResendSuccess, onResendError);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedOtp = otp.trim();

    if (!trimmedOtp) {
      alert('Please enter the 6-digit code');
      return;
    }

    if (trimmedOtp.length !== 6 || /\D/.test(trimmedOtp)) {
      alert('Code must be exactly 6 digits');
      return;
    }

    verifyOtp(trimmedOtp);
  };

  const handleResend = (e: React.FormEvent) => {
    e.preventDefault();
    resendOtp(email);
  };

  const onRenavigate = () => {
    router.back();
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
    onRenavigate
  };
}
