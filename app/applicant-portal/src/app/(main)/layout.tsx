"use client";
import { Separator } from "@/components/shadcn/ui/separator";
import { AuthProtectedProvider } from "@/providers/AuthProvider";
import { NavigationTabOption } from "@/types/NavigationTab";
import { NavigationBar } from "./components/NavigationBar";
import MobileNav from "./components/NavigationMobile";

const components: NavigationTabOption[] = [
  {
    label: "Dashboard",
    href: "/my-dashboard",
    description: "",
  },
  {
    label: "Sign out",
    href: "/sign-out",
    description: "",
  }
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProtectedProvider>
      <div>
        <div>
          <div className="max-w-full flex justify-start md:justify-center py-2 md:py-8">
            <div className="max-w-md md:flex flex-col items-center justify-center gap-16 hidden">
              <NavigationBar navigationOptions={components} />
            </div>
            <div className="w-full md:hidden">
              <MobileNav navigationOptions={components} />
              <Separator className="my-4" />
            </div>
          </div>

          {children}
        </div>
      </div>
    </AuthProtectedProvider>
  );
}
