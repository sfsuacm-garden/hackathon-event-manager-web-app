"use client";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/shadcn/ui/alert";
import { Input } from "@/components/shadcn/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { useOtpVerification } from "./hooks";

export default function AuthBase() {
  const searchParams = useSearchParams();
  const email = useMemo(() => searchParams.get("email") ?? "", [searchParams]);
  const authFlow = useMemo(
    () => searchParams.get("auth") as "signup" | "login" | null,
    [searchParams]
  );

  const {
    otp,
    setOtp,
    handleResend,
    isVerifyOtpPending,
    isVerifyOtpError,
    verifyOtpError,
    isresendOtpPending,
    handleVerify,
    onRenavigate,
    messages,
  } = useOtpVerification(email, authFlow);

  return (
    <div>
      <form onSubmit={handleVerify} className="space-y-2">
        <div className="space-y-2">
          <h2 className="scroll-m-20 text-xl font-semibold tracking-tight ">
            {messages.description}
          </h2>
          <Input
            id="otp"
            inputMode="numeric"
            autoComplete="one-time-code"
            pattern="[0-9]*"
            maxLength={6}
            value={otp}
            onChange={(e: { target: { value: string } }) =>
              setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
            }
            className="text-center font-mono tracking-[0.5em]"
            placeholder="••••••"
          />
        </div>

        <Button type="submit" className="w-full" disabled={isresendOtpPending}>
          {isresendOtpPending ? (
            <span className="flex items-center justify-center gap-2">
              <Spinner className="h-4 w-4 animate-spin" />
            </span>
          ) : (
            messages.buttonText
          )}
        </Button>

        <div className="flex justify-between text-xs text-muted-foreground">
          <button
            type="button"
            onClick={onRenavigate}
            className="underline underline-offset-2"
            disabled={isVerifyOtpPending}
          >
            {messages.renavigateText}
          </button>
          {isVerifyOtpError && (
            <div className="mt-2">
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{verifyOtpError?.message}</AlertDescription>
              </Alert>
            </div>
          )}
          <button
            type="button"
            onClick={handleResend}
            className="underline underline-offset-2"
            disabled={isVerifyOtpPending || isresendOtpPending}
          >
            {messages.resendText}
          </button>
          {}
        </div>
      </form>
    </div>
  );
}
