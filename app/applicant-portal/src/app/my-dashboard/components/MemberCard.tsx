/**
 * MemberCard.tsx
 *
 * Provide status updates and team actionable items.
 */
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/shadcn/ui/avatar";
import { Badge } from "@/components/shadcn/ui/badge";
import { BadgeCheckIcon } from "lucide-react";
import { Button } from "@/components/shadcn/ui/button";
import { Icons } from "@/lib/icons";
export default function TeamMemberCard() {
  return (
    <Card>
      <CardContent>
        <div className="flex gap-4 justify-between">
          <div className="flex gap-4">
            <Avatar>
              <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe-UxhlswN7mS_tqXj0L9a00hL_NHisSSqn4Mm6FW8BuvQI_8wHrLG7pUlkvozlpwASp0&usqp=CAU" />
              <AvatarFallback>VC</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h3 className="text-sm font-semibold">John Smith</h3>
              <p className="text-sm">jsmith@sfsu.edu</p>
              <div className="text-muted-foreground text-xs">
                Joined April 2nd, 5:00pm.
              </div>
            </div>
          </div>
          {/* TODO: Fix width on button */}
          <div className="flex gap-4 justify-end items-center">
            <Badge
              variant="default"
              className="h-6 px-2 flex items-center gap-1"
            >
              <BadgeCheckIcon className="w-4 h-4" />
              Badge
            </Badge>
            <Button variant="outline" size="icon" className="size-8">
              <Icons.ellipsisVertical />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
