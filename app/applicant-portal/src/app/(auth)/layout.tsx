import EventHeader from '@/components/ui/event-header';

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="mx-auto w-full max-w-lg px-6 py-12 space-y-8 ">
      {/* TODO Still appears in loading for replacements on create-profile. Find a way to hide this on that load.  */}
      <EventHeader />

      {children}
    </main>
  );
}
