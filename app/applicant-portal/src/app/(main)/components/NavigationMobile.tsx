import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/shadcn/ui/sheet";
import { Button } from "@/components/ui/button";
import { NavigationTabOption } from "@/types/NavigationTab";
import { Menu } from "lucide-react";
import Link from "next/link";

interface NavigationMenuProps {
  navigationOptions: NavigationTabOption[];
}

export default function MobileNav({ navigationOptions }: NavigationMenuProps) {
  return (
    <Sheet>
      {/* Trigger button */}
      <SheetTrigger asChild>
        <Button variant="ghost" size="lg">
          <Menu className="h-24 w-24" />
          <p>Menu</p>
        </Button>
      </SheetTrigger>

      {/* Drawer content */}
      <SheetContent side="left" className="w-[250px] sm:hidden">
        <SheetHeader>
          <SheetTitle className="text-lg font-bold">Menu</SheetTitle>
        </SheetHeader>
        <div className="mt-6 flex flex-col space-y-4 p-4">
          {navigationOptions.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-base font-medium hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
