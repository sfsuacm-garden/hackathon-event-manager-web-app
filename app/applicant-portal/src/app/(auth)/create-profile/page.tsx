'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/shadcn/ui/alert';
import { Button } from '@/components/shadcn/ui/button';
import { Input } from '@/components/shadcn/ui/input';
import { Spinner } from '@/components/ui/shadcn-io/spinner';
import { todayYMD } from '@/utils/ageChecker';

import RequiredStar from '@/components/form/RequiredStar';
import { PhoneInput } from '@/components/PhoneInput';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel
} from '@/components/shadcn/ui/field';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { trpc } from '@/utils/trpc';
import { useRouter } from 'next/navigation';
import nProgress from 'nprogress';
import { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import { useCreateProfile } from './hooks';

export default function CreateProfile() {
  const { form, handleSubmit, isLoading, error } = useCreateProfile();
  const router = useRouter();

  const { data: profile, isLoading: profileLoading } = trpc.profile.me.useQuery(undefined, {
    //Enabled by user can be assumed since provider protection.
    staleTime: 5 * 60 * 1000
  });

  const [isRedirecting, setIsRedirecting] = useState(false);

  // Start/stop NProgress
  useEffect(() => {
    if (profileLoading || isRedirecting) {
      nProgress.start();
    } else {
      nProgress.done();
    }

    return () => {
      nProgress.done();
    };
  }, [profileLoading, isRedirecting]);

  // Redirect if profile exists
  useEffect(() => {
    if (profileLoading) return;

    if (profile) {
      setIsRedirecting(true);
      router.replace('/my-dashboard');
    }
  }, [profile, profileLoading, router]);

  // Don’t render form until we know user should see it
  if (profileLoading || isRedirecting || profile) {
    return null; // NProgress shows at top
  }

  return (
    <main className="flex justify-center items-center">
      <Card className="w-full sm:max-w-md">
        <CardHeader>
          <CardTitle>Create your profile</CardTitle>
          <CardDescription>Create your profile to join events as a hacker.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Controller
                name="dob"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>
                      Date of Birth
                      <RequiredStar />
                    </FieldLabel>
                    <Input
                      {...field}
                      type="date"
                      max={todayYMD()}
                      aria-invalid={fieldState.invalid}
                    />
                    <FieldDescription>
                      Participants must be 18+ due to venue regulations.
                    </FieldDescription>

                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <div className="grid w-full gap-4 sm:grid-cols-2">
                <Controller
                  name="firstName"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>
                        First Name
                        <RequiredStar />
                      </FieldLabel>
                      <Input
                        {...field}
                        placeholder="John"
                        autoComplete="given-name"
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
                <Controller
                  name="lastName"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>
                        Last Name
                        <RequiredStar />
                      </FieldLabel>
                      <Input
                        {...field}
                        placeholder="Doe"
                        autoComplete="family-name"
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
              </div>
              <Controller
                name="phoneNumber"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>
                      Phone Number
                      <RequiredStar />
                    </FieldLabel>
                    <PhoneInput
                      {...field}
                      type="tel"
                      placeholder="(555) 555-5555"
                      autoComplete="tel"
                      aria-invalid={fieldState.invalid}
                    />
                    <FieldDescription>
                      Used only for emergency notifications (e.g., weather).
                    </FieldDescription>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </FieldGroup>

            {error && (
              <Alert variant="destructive" className="mt-4">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error.message}</AlertDescription>
              </Alert>
            )}
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-2">
          <Button
            type="submit"
            form="form-rhf-demo"
            className="w-full"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <Spinner className="h-4 w-4 animate-spin" />
                Creating Profile...
              </span>
            ) : (
              'Create Account'
            )}
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
