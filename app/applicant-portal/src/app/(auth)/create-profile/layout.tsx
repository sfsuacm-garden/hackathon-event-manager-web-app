import { AuthOnlyProvider } from "@/providers/ProtectedProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthOnlyProvider>
        {children}
    </AuthOnlyProvider>
  );
}
