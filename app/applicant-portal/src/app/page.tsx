"use client";
// src/pages/index.tsx (or src/App.tsx if CRA)

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/my-dashboard");
  });

  return <></>;
}