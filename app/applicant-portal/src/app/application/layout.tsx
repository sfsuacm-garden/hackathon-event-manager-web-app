import { AuthOnlyProvider, BaseProtectedProvider } from "@/providers/ProtectedProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthOnlyProvider>
      <BaseProtectedProvider>
       {children}
      </BaseProtectedProvider>
    </AuthOnlyProvider>
  );
}
