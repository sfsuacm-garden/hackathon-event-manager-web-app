"use client";

import { VerifyOtpPage } from "./components/VerifyOTPPage";

type VerifyOtpPageProps = {
  searchParams: Promise<{
    email?: string;
    auth?: "signup" | "login";
  }>;
};

export default async function VerifyOtp({ searchParams }: VerifyOtpPageProps) {
  const params = await searchParams;
  const email = params?.email ?? "";
  const authFlow = params?.auth ?? null;

  return <VerifyOtpPage email={email} authFlow={authFlow} />;
}