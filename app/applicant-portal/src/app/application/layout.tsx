import {  AuthOnlyProvider, BaseProtectedProvider } from "@/providers/ProtectedProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthOnlyProvider>
      <BaseProtectedProvider>
         <main className="mx-auto w-full max-w-lg px-6 py-12 space-y-8 ">
        {children}
      </main>
      </BaseProtectedProvider>
    </AuthOnlyProvider>
  );
}
