"use client";

import { SetStateAction, useState } from "react";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/shadcn/ui/alert";
import { Button } from "@/components/shadcn/ui/button";
import { Input } from "@/components/shadcn/ui/input";
import { Label } from "@/components/shadcn/ui/label";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { is18By, todayYMD } from "@/utils/ageChecker";
import { useSendOtp } from "../hooks/useSendOTPHook";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dob, setDob] = useState("");

  const {
    mutate: sendOtp, // The function to call the mutation
    isPending, // Boolean: true when the verification is
    isError,
    error,
  } = useSendOtp(email, "signup", {
    signupData: {
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      dob: dob,
      role: "hacker",
    },
  });

  const handleSendCode = (e: React.FormEvent) => {
    const missingFields = [];
    if (!email) missingFields.push("Email");
    if (!firstName) missingFields.push("First name");
    if (!lastName) missingFields.push("Last name");
    if (!phoneNumber) missingFields.push("Phone number");
    if (!dob) missingFields.push("Date of birth");
    if (missingFields.length > 0) {
      alert(`Missing: ${missingFields.join(", ")}`);
      return;
    }

    if (!is18By(dob)) {
      alert(`Due to venue restritctions..`);
      return;
    }
    e.preventDefault();
    sendOtp();
  };

  return (
    <main className="mx-auto w-full max-w-md p-6">
      <form onSubmit={handleSendCode} className="space-y-4">
        <div className="space-y-2">
          <Label>First name</Label>
          <Input
            value={firstName}
            onChange={(e: { target: { value: SetStateAction<string> } }) =>
              setFirstName(e.target.value)
            }
          />
        </div>

        <Label>Last name</Label>
        <Input
          value={lastName}
          onChange={(e: { target: { value: SetStateAction<string> } }) =>
            setLastName(e.target.value)
          }
        />
        <Label>Email</Label>
        <Input
          type="email"
          value={email}
          onChange={(e: { target: { value: SetStateAction<string> } }) =>
            setEmail(e.target.value)
          }
        />
        <Label>Phone number</Label>
        <Input
          value={phoneNumber}
          onChange={(e: { target: { value: SetStateAction<string> } }) =>
            setPhoneNumber(e.target.value)
          }
        />
        <Label>Date of birth</Label>
        <Input
          type="date"
          value={dob}
          onChange={(e: { target: { value: SetStateAction<string> } }) =>
            setDob(e.target.value)
          }
          max={todayYMD()}
        />
        {isError && (
          <div className="mt-2">
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error.message}</AlertDescription>
            </Alert>
          </div>
        )}
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? (
            <span className="flex items-center justify-center gap-2">
              <Spinner className="h-4 w-4 animate-spin" />
            </span>
          ) : (
            `Create Account`
          )}
        </Button>
      </form>
    </main>
  );
}
