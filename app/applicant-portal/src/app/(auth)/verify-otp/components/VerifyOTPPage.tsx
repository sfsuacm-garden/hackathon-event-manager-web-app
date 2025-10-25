'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/shadcn/ui/alert';
import { Button } from '@/components/shadcn/ui/button';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel
} from '@/components/shadcn/ui/field';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/shadcn/ui/input-otp';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Spinner } from '@/components/ui/shadcn-io/spinner';
import { toast } from 'sonner';
import { useOtpVerification } from '../hooks';

type Props = {
  email: string;
};

export function VerifyOtpPage({ email }: Props) {
  const {
    otp,
    setOtp,
    handleVerify,
    handleResend,
    isVerifying,
    isVerifyError,
    verifyError,
    isResending,
    messages,
    onRenavigate
  } = useOtpVerification(email);

  const onResendClick = (e: React.FormEvent) => {
    try {
      handleResend(e);
      toast.success('Verification code sent!', {
        description: `A new code has been sent to ${email}`
      });
    } catch (error) {
      toast.error('Failed to resend code', {
        description: error instanceof Error ? error.message : 'Please try again in a moment.'
      });
    }
  };

  return (
    <main className="flex justify-center items-center p-4">
      <Card className="w-full sm:max-w-md">
        <CardHeader>
          <CardTitle>Verify Account</CardTitle>
          <CardDescription>{messages.description}</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleVerify} className="space-y-6">
            <FieldGroup>
              <Field>
                <FieldLabel>One-Time Password</FieldLabel>
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={(val: string) => setOtp(val.replace(/\D/g, '').slice(0, 6))}
                >
                  <InputOTPGroup>
                    {Array.from({ length: 6 }).map((_, idx) => (
                      <InputOTPSlot key={idx} index={idx} />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
                <FieldDescription>
                  Please enter the one-time password sent to your email.
                </FieldDescription>
                {isVerifyError && <FieldError errors={[{ message: verifyError?.message ?? '' }]} />}
              </Field>
            </FieldGroup>

            <Button type="submit" className="w-full" disabled={isVerifying}>
              {isVerifying ? (
                <span className="flex items-center justify-center gap-2">
                  <Spinner className="h-4 w-4 animate-spin" />
                  Verifying...
                </span>
              ) : (
                messages.buttonText
              )}
            </Button>

            <CardFooter className="flex justify-between text-xs text-muted-foreground">
              <button
                type="button"
                onClick={onRenavigate}
                className="underline underline-offset-2"
                disabled={isVerifying}
              >
                {messages.renavigateText}
              </button>

              <button
                type="button"
                onClick={onResendClick}
                className="underline underline-offset-2"
                disabled={isVerifying || isResending}
              >
                {isResending ? 'Sending...' : messages.resendText}
              </button>
            </CardFooter>

            {isVerifyError && (
              <Alert variant="destructive" className="mt-2">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{verifyError?.message}</AlertDescription>
              </Alert>
            )}
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
