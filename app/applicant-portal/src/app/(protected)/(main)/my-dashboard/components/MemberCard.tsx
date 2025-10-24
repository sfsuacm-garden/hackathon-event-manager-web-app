/**
 * MemberCard.tsx
 *
 * Provide status updates and team actionable items.
 */
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/shadcn/ui/alert-dialog";
import {
  Avatar,
  AvatarFallback,
} from "@/components/shadcn/ui/avatar";
import { Badge } from "@/components/shadcn/ui/badge";
import { Button } from "@/components/shadcn/ui/button";
import { Skeleton } from "@/components/shadcn/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/shadcn/ui/tooltip";
import { Card, CardContent } from "@/components/ui/card";
import { Icons } from "@/lib/icons";
import { cn } from "@/lib/shadcn/utils";
import { trpc } from "@/utils/trpc";
import { BadgeCheckIcon } from "lucide-react";
import { useState } from "react";
import StatusBadge from "../../../../../components/StatusBadge";
import ErrorStateAlert from "../../components/ErrorStateAlert";

interface TeamMember {
  teamId: string;
  userId: string;
  isAdmin: boolean | null;
  joinedAt: string | null;
  event_id: string;
  profile: {
    applications: {
      createdAt: string | null;
      status: string | null;
      schoolEmail: string | null;
    }[];
    firstName: string | null;
    lastName: string | null;
  };
}

interface TeamMemberCardProps {
  teamMemberInfo: TeamMember
  isTeamAdmin: boolean;
  isMemberLoggedInUser: boolean;
  isAdminLoggedInUser: boolean;
}

export default function TeamMemberCard({
  teamMemberInfo,
  isTeamAdmin: isTeamAdmin,
  isMemberLoggedInUser,
  isAdminLoggedInUser,
  className,
}: TeamMemberCardProps & React.ComponentProps<"div">) {
  const loading = false;
  const error = false;
  //const isMemberUser = false;
  const isTeamManagementUnlocked = true; // maybe this should be passed in as a prop or something or we need to find some sort of global context for this because having to calculate this multiple times via an API call will be crazy

  const applicationStatus = teamMemberInfo.profile.applications[0].status?.toUpperCase() as "PENDING" | "REJECTED" | "ACCEPTED" | "WAITLISTED";
  const firstName = teamMemberInfo.profile.firstName ?? 'Unknown';
  const lastName = teamMemberInfo.profile.lastName ?? 'Unknown';
  const firstInitial = teamMemberInfo.profile.firstName?.[0] ?? '?';
  const lastInitial = teamMemberInfo.profile.lastName?.[0] ?? '?';
  const memberInitials = firstInitial + lastInitial;
  const email = teamMemberInfo?.profile?.applications?.[0].schoolEmail ?? 'Unknown email';
  const joinedTeamDate = teamMemberInfo?.joinedAt ?? 'Unknown'
  const userId = teamMemberInfo.userId;

  const [kickMutationSuccess, setKickMutationSuccess] = useState(true);

  const utils = trpc.useUtils();
  const kickFromTeamMutation = trpc.teams.kickTeamMemberById.useMutation({
    onSuccess: () => {
      setKickMutationSuccess(true);
      utils.teams.getOwnTeam.invalidate();
    },
    onError: () => {
      setKickMutationSuccess(false);
    }
  });

  const handleKickTeam = () => {
    kickFromTeamMutation.mutate({ memberBeingKickedId: userId })
  }


  // const member = {
  //   name: "John Smith",
  //   email: "jsmith@sfsu.edu",
  //   joined: "April 2nd, 5:00pm",
  //   avatarUrl:
  //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe-UxhlswN7mS_tqXj0L9a00hL_NHisSSqn4Mm6FW8BuvQI_8wHrLG7pUlkvozlpwASp0&usqp=CAU",
  //   initials: userId,
  // };

  return (
    <>
      {/* {!kickMutationSuccess ?} */}

      {error ? (
        <Card className={cn(className)}>
          <CardContent>
            <div className="flex gap-4 justify-between">
              <div className="flex gap-4">
                <Avatar className="opacity-0 w-8 h-8">
                  {/* <AvatarImage src={member.avatarUrl} /> */}
                  <AvatarFallback>{memberInitials}</AvatarFallback>
                </Avatar>

                <div className="space-y-1">
                  <h3 className="text-sm font-semibold">
                    Uh oh something went wrong.
                  </h3>
                  <p className="text-sm">Refresh the page to reload.</p>
                  <div className="text-muted-foreground text-xs">
                    Joined -- --- ---
                  </div>
                </div>
              </div>

              <div className="flex gap-4 justify-end items-center">
                <Badge
                  variant="default"
                  className="h-6 px-2 flex items-center gap-1"
                >
                  <BadgeCheckIcon className="w-4 h-4" />
                  Owner
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className={cn(className)}>
          <CardContent>
            <div className="flex gap-4 justify-between">
              <div className="flex gap-4">
                {loading ? (
                  <Skeleton className="size-8 rounded-full" />
                ) : (
                  <Avatar>
                    {/* <AvatarImage src={member.avatarUrl} /> */}
                    <AvatarFallback>{memberInitials}</AvatarFallback>
                  </Avatar>
                )}

                <div className="space-y-1">
                  {loading ? (
                    <>
                      <Skeleton className="h-[14px] w-24" />
                      <Skeleton className="h-[14px] w-36" />
                      <Skeleton className="h-[12px] w-20" />
                    </>
                  ) : (
                    <>
                      <h3 className="text-sm font-semibold">
                        {!isMemberLoggedInUser ? firstName + " " + lastName : "You"}
                        {isTeamAdmin && " - Team Admin"}
                      </h3>
                      <p className="text-sm">{email}</p>
                      <div className="text-muted-foreground text-xs">
                        Joined {joinedTeamDate}
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="flex gap-4 justify-end items-center">
                {loading ? (
                  <Skeleton className="h-6 w-16 rounded-md" />
                ) : (
                  <>
                    <StatusBadge status={applicationStatus ?? 'PENDING'} />
                    {isAdminLoggedInUser &&
                      !isMemberLoggedInUser &&
                      isTeamManagementUnlocked && (
                        <AlertDialog>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="size-8"
                                >
                                  <Icons.x />
                                </Button>
                              </AlertDialogTrigger>
                            </TooltipTrigger>
                            <TooltipContent>
                              <span>Remove member</span>
                            </TooltipContent>
                          </Tooltip>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Remove member?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to remove this member from
                                your team? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={handleKickTeam}>Remove</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}
                  </>
                )}
              </div>
            </div>
            {!kickMutationSuccess && (
              <ErrorStateAlert
                title={{text: 'Error kicking member'}}
                description={{text: 'There was an error kicking the member. Please try again or contact the team.'}}
              />
            )}
          </CardContent>
        </Card>
      )}
    </>
  );
}
