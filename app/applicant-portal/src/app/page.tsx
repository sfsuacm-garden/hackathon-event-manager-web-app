"use client";
// src/pages/index.tsx (or src/App.tsx if CRA)

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle>Welcome to Shadcn UI</CardTitle>
          <CardDescription>
            This is a basic starting page using shadcn components.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Build beautiful UIs with ease using shadcn and Tailwind CSS.
          </p>
          <Button onClick={() => alert("Hello from shadcn!")}>Click me</Button>
        </CardContent>
      </Card>
    </main>
  );
}
