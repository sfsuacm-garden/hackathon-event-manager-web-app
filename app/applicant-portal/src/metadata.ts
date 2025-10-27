import { Metadata } from 'next';

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
