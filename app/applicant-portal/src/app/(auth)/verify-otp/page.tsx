"use client";

import { VerifyOtpPage } from "./components/VerifyOTPPage";


// TODO In Next.js 15+, searchParams is now asynchronous and needs to be awaited. 
// For some reason though there is a console error popping up from this being async though. 
// Don't have time to investigate but works fine.
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