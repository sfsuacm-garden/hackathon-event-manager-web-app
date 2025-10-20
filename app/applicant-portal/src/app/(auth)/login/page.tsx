"use client";

"use client";

import RequiredStar from "@/components/form/RequiredStar";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/shadcn/ui/alert";
import { Button } from "@/components/shadcn/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/shadcn/ui/field";
import { Input } from "@/components/shadcn/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { useSendOtp } from "../../../hooks/auth";

const loginFormSchema = z.object({
  email: z.email("Enter a valid email address."),
});

export default function LoginPage() {

  //TODO move this logic over to its own hook.
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const {
    mutate: sendOtp,
    isPending,
    isError,
    error,
  } = useSendOtp(form.watch("email"), "login");

  function onSubmit(_: z.infer<typeof loginFormSchema>) {
    sendOtp();
  }

  return (
    <main className="flex justify-center items-center">
      <Card className="w-full sm:max-w-md">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Enter your email address to sign in or continue where you left off.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
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
              "Send Login Code"
            )}
          </Button>

          <div className="mt-4 text-sm text-center text-gray-600">
            Don’t have an account?{" "}
            <Link
              href="/signup"
              className="text-accent hover:underline font-medium"
            >
              Sign up here
            </Link>
          </div>
        </CardFooter>
      </Card>
    </main>
  );
}
