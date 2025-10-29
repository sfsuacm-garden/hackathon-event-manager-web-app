export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen w-full items-center justify-center px-6 py-12">
      <div className="w-full max-w-lg space-y-8">
        {/* TODO Still appears in loading for replacements on create-profile. Find a way to hide this on that load. */}

        {children}
      </div>
    </main>
  );
}
