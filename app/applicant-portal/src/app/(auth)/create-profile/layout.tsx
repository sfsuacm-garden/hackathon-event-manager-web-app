import { AuthOnlyProvider, TeamManagementProtectedProvider } from '@/providers/ProtectedProvider';

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthOnlyProvider>
      <TeamManagementProtectedProvider>{children}</TeamManagementProtectedProvider>
    </AuthOnlyProvider>
  );
}
