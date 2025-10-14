"use client";

import * as React from "react";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/shadcn/ui/navigation-menu";
import { NavigationTabOption } from "@/types/NavigationTab";
import SignOutBtn from "./SignOutBtn.tsx"

interface NavigationMenuProps {
  navigationOptions: NavigationTabOption[];
}

export function NavigationBar({ navigationOptions }: NavigationMenuProps) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          {navigationOptions.map((option) => (
            <NavigationMenuLink
              key={option.href}
              asChild
              className={navigationMenuTriggerStyle()}
            >
              {
                option.label === "Sign out"
                ? <SignOutBtn />
                : <Link href={option.href}>{option.label}</Link>
              }
            </NavigationMenuLink>
          ))}
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

// function ListItem({
//   title,
//   children,
//   href,
//   ...props
// }: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
//   return (
//     <li {...props}>
//       <NavigationMenuLink asChild>
//         <Link href={href}>
//           <div className="text-sm leading-none font-medium">{title}</div>
//           <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
//             {children}
//           </p>
//         </Link>
//       </NavigationMenuLink>
//     </li>
//   );
// }
