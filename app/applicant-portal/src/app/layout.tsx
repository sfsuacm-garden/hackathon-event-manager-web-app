import GlobalProgressBar from '@/components/GlobalProgressBar';
import { Toaster } from '@/components/shadcn/ui/sonner';
import { metadata } from '@/metadata';
import '@/styles/globals.css';
import { Geist, Geist_Mono } from 'next/font/google';
import Head from 'next/head';
import Providers from '../providers';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Head>
          <title>
            <title>{metadata.title?.toString()}</title>
          </title>
          <meta name="description" content={metadata.description?.toString()} />
          <link rel="icon" href={metadata.icons?.toString()} />
          <link rel="shortcut icon" href={metadata.icons?.toString()} />
          <link rel="apple-touch-icon" href={metadata.icons?.toString()} />
        </Head>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <GlobalProgressBar />
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
