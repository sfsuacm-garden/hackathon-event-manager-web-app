"use client";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/shadcn/ui/alert";
import { Button } from "@/components/shadcn/ui/button";
import { Input } from "@/components/shadcn/ui/input";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { todayYMD } from "@/utils/ageChecker";
import { useSendOtp } from "../../../hooks/auth";

import RequiredStar from "@/components/form/RequiredStar";
import { PhoneInput } from "@/components/PhoneInput";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/shadcn/ui/field";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

// 🧩 Define the schema for validation
const signupFormSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "First name must be at least 2 characters.")
      .max(32, "First name must be at most 32 characters."),
    lastName: z
      .string()
      .min(2, "Last name must be at least 2 characters.")
      .max(32, "Last name must be at most 32 characters."),
    email: z.email("Enter a valid email address."),
    phoneNumber: z
      .string()
      .min(10, "Phone number must be at least 10 digits.")
      .max(20, "Phone number must be at most 20 digits."),
    dob: z.string().refine((val) => {
      const date = new Date(val);
      const now = new Date();
      return !isNaN(date.getTime()) && date <= now;
    }, "Please enter a valid date of birth"),
  })
  .required();

export default function SignupPage() {

  //TODO move this logic over to its own hook.
  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      dob: "",
    },
  });

  const {
    mutate: sendOtp,
    isPending,
    isError,
    error,
  } = useSendOtp(form.watch("email"), "signup", {
    signupData: {
      firstName: form.watch("firstName"),
      lastName: form.watch("lastName"),
      phoneNumber: form.watch("phoneNumber"),
      dob: form.watch("dob"),
    },
  });

  function onSubmit(_: z.infer<typeof signupFormSchema>) {
    sendOtp();
  }

  return (
    <main className="flex justify-center items-center">
      <Card className="w-full sm:max-w-md">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>
            Create your account to join the event as a hacker.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
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

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
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
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
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
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
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
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
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
                      University emails are preferred to verify your school.
                    </FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            {isError && (
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
            onClick={form.handleSubmit(onSubmit)}
            disabled={isPending}
          >
            {isPending ? (
              <span className="flex items-center justify-center gap-2">
                <Spinner className="h-4 w-4 animate-spin" />
                Sending Code...
              </span>
            ) : (
              "Create Account"
            )}
          </Button>
          <div className="mt-4 text-sm text-center text-gray-600">
            Already started signing up?{" "}
            <Link
              href="/login"
              className="text-accent hover:underline font-medium"
            >
              Login here
            </Link>
          </div>
        </CardFooter>
      </Card>
    </main>
  );
}
