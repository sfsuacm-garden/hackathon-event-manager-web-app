import {
  AuthOnlyProvider,
  BaseProtectedProvider,
  TeamManagementProtectedProvider
} from '@/providers/ProtectedProvider';

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthOnlyProvider>
      <BaseProtectedProvider>
        <TeamManagementProtectedProvider>
          <main className="mx-auto w-full max-w-lg px-6 py-12 space-y-8 ">{children}</main>
        </TeamManagementProtectedProvider>
      </BaseProtectedProvider>
    </AuthOnlyProvider>
  );
}
