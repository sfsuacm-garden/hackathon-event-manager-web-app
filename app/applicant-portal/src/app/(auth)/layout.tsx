export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="mx-auto w-full max-w-lg px-6 py-12 space-y-8 ">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-extrabold tracking-tight">
          Be Apart of SF Hacks 2026
        </h1>
        <p className="text-muted-foreground">
          February 14th @ Annex 1 | San Francisco State University
        </p>
      </div>

      {children}
    </main>
  );
}

//  <main className="mx-auto w-full max-w-3xl px-6 py-12">
//       <div className="mb-8">
//         <Progress value={progress} className="h-2 rounded-full bg-muted" />
//       </div>
