'use client';

'use client';

import RequiredStar from '@/components/form/RequiredStar';
import { Alert, AlertDescription, AlertTitle } from '@/components/shadcn/ui/alert';
import { Button } from '@/components/shadcn/ui/button';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel
} from '@/components/shadcn/ui/field';
import { Input } from '@/components/shadcn/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Spinner } from '@/components/ui/shadcn-io/spinner';
import { Controller } from 'react-hook-form';
import { useSendOtp } from './hooks';

export default function SendOTPPage() {
  const { form, onSubmit, isLoading } = useSendOtp();

  return (
    <main className="flex justify-center items-center">
      <Card className="w-full sm:max-w-md">
        <div className="flex justify-center pt-6">
          <img src="/logo_white.png" alt="App Logo" className="h-16 w-auto object-contain" />
        </div>
        <CardHeader>
          <CardTitle>Continue with your email</CardTitle>
          <CardDescription>
            Enter your email address and we’ll send you a one-time verification code.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={onSubmit}>
            <FieldGroup>
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>
                      Email
                      <RequiredStar />
                    </FieldLabel>
                    <Input
                      {...field}
                      type="email"
                      placeholder="john@example.com"
                      autoComplete="email"
                      aria-invalid={fieldState.invalid}
                    />
                    <FieldDescription>
                      We’ll send a one-time code to this email for login.
                    </FieldDescription>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </FieldGroup>

            {form.formState.errors.root && (
              <Alert variant="destructive" className="mt-4">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{form.formState.errors.root.message}</AlertDescription>
              </Alert>
            )}
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-2">
          <Button type="submit" className="w-full" onClick={onSubmit} disabled={isLoading}>
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <Spinner className="h-4 w-4 animate-spin" />
                Sending Code...
              </span>
            ) : (
              'Send Login Code'
            )}
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
