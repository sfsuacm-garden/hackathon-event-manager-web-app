import GlobalProgressBar from '@/components/GlobalProgressBar';
import { Toaster } from '@/components/shadcn/ui/sonner';
import '@/styles/globals.css';
import { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Link from 'next/link';
import Providers from '../providers';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: 'SF Hacks 2026 Application Signup',
  description:
    'Sign up to participate in SF Hacks 2026, the premier student hackathon in San Francisco. Submit your application to join the event and showcase your skills!',
  icons: 'logo_pink.png',
  keywords: [
    'SF Hacks 2026',
    'hackathon',
    'student hackathon',
    'signup',
    'application',
    'sf hacks'
  ],
  authors: [{ name: 'SFHacks Team', url: 'https://sfhacks.io' }],
  openGraph: {
    title: 'SF Hacks 2026 Application Signup',
    description:
      'Apply to SF Hacks, San Francisco’s top student hackathon. Submit your application now!',
    siteName: 'Apply to SF Hacks 2026',
    images: [
      {
        url: '/banner1.png',
        width: 1200,
        height: 630,
        alt: 'SFHacks Hackathon'
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  themeColor: '#ff00c8'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex min-h-screen flex-col`}
      >
        <GlobalProgressBar />

        <Providers>
          <main className="flex-1">{children}</main>
          <footer className="py-6 text-center text-sm text-muted-foreground">
            Made by{' '}
            <Link
              href="https://bento.me/acm-sfsu"
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-2 hover:underline transition-colors hover:text-foreground"
            >
              ACM @ SFSU
            </Link>
          </footer>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
