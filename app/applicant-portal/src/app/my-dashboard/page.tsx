/**
 * My Dashboard Page
 *
 *
 */
import { Button } from "@/components/ui/button";
import { Icons } from "@/lib/icons";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TeamMemberCard from "./components/MemberCard";
import TeamView from "./components/TeamView";
import {
  Alert,
  AlertTitle,
  AlertDescription,
} from "@/components/shadcn/ui/alert";
import { Terminal } from "lucide-react";

export default function MyDashboardView() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto flex flex-col items-start justify-start gap-16">
        <div className="flex flex-col gap-4">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Application Status
          </h3>
          <p className="text-muted-foreground text-xl">
            Sit tight! Applications are still open. Feel free to find new
            teammates and encourage your friends to sign up here.
          </p>
        </div>

        <TeamView />
      </div>
    </main>
  );
}
