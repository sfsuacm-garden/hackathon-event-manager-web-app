"use client";
import { NavigationTabOption } from "@/types/NavigationTab";
import { NavigationBar } from "./components/NavigationBar";
import MobileNav from "./components/NavigationMobile";
import { Separator } from "@/components/shadcn/ui/separator";

const components: NavigationTabOption[] = [
  {
    label: "Dashboard",
    href: "/my-dashboard",
    description: "",
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="max-w-full flex justify-start md:justify-center py-4 md:py-16">
          <div className="max-w-md md:flex flex-col items-center justify-center gap-16 hidden">
            <NavigationBar navigationOptions={components} />
          </div>
          <div className="w-full md:hidden">
            <MobileNav navigationOptions={components} />
            <Separator className="my-4" />
          </div>
        </div>

        {children}
      </body>
    </html>
  );
}
