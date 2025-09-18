/**
 * MemberCard.tsx
 *
 * Provide status updates and team actionable items.
 */
import { Card, CardContent } from "@/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/shadcn/ui/avatar";
import { Badge } from "@/components/shadcn/ui/badge";
import { BadgeCheckIcon } from "lucide-react";
import { Button } from "@/components/shadcn/ui/button";
import { Icons } from "@/lib/icons";
import { Skeleton } from "@/components/shadcn/ui/skeleton";
import { cn } from "@/lib/shadcn/utils";
import StatusBadge from "../../../../components/StatusBadge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/shadcn/ui/tooltip";
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

interface TeamMemberCardProps {
  userId: string;
  isTeamAdmin: boolean;
}

export default function TeamMemberCard({
  userId,
  isTeamAdmin: isTeamAdmin,
  className,
}: TeamMemberCardProps & React.ComponentProps<"div">) {
  const loading = false;
  const error = false;
  const isMemberUser = false;
  const isTeamManagementUnlocked = true;

  const member = {
    name: "John Smith",
    email: "jsmith@sfsu.edu",
    joined: "April 2nd, 5:00pm",
    avatarUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe-UxhlswN7mS_tqXj0L9a00hL_NHisSSqn4Mm6FW8BuvQI_8wHrLG7pUlkvozlpwASp0&usqp=CAU",
    initials: userId,
  };

  return (
    <>
      {error ? (
        <Card className={cn(className)}>
          <CardContent>
            <div className="flex gap-4 justify-between">
              <div className="flex gap-4">
                <Avatar className="opacity-0 w-8 h-8">
                  <AvatarImage src={member.avatarUrl} />
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
                    <AvatarImage src={member.avatarUrl} />
                    <AvatarFallback>{member.initials}</AvatarFallback>
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
                        {!isMemberUser ? member.name : "You"}
                        {" - Team Admin"}
                      </h3>
                      <p className="text-sm">{member.email}</p>
                      <div className="text-muted-foreground text-xs">
                        Joined {member.joined}
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
                    <StatusBadge status={"WAITLISTED"} />
                    {isTeamAdmin &&
                      !isMemberUser &&
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
                              <AlertDialogAction>Remove</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
