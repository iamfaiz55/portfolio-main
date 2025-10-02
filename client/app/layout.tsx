import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Providers from './Provider';
import Script from 'next/script';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// 🌐 Global SEO Metadata for Portfolio
export const metadata: Metadata = {
  title: 'Shaikh Faiz | Full Stack MERN Developer & IT Services Provider',
  description:
    'Shaikh Faiz is a Full Stack MERN Developer, Software Developer, and Mobile App Developer. Offering web development, mobile apps, cloud solutions, and IT services at affordable prices.',
  keywords: [
    'Shaikh Faiz',
    'Full Stack Developer',
    'MERN Developer',
    'Software Developer',
    'Mobile App Developer',
    'Freelance Developer',
    'Web Development',
    'Cloud Solutions',
    'Affordable IT Services',
    'React Developer',
    'Node.js Developer',
    'JavaScript Developer',
  ],
  authors: [{ name: 'Shaikh Faiz', url: 'https://shaikhfaiz.top' }],
  viewport: 'width=device-width, initial-scale=1',
  robots:
    'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
  openGraph: {
    title: 'Shaikh Faiz | Full Stack MERN Developer & IT Services Provider',
    description:
      'Explore the portfolio of Shaikh Faiz – Full Stack MERN Developer, Software & Mobile App Developer delivering powerful and affordable IT solutions.',
    url: 'https://shaikhfaiz.top',
    siteName: 'Shaikh Faiz',
    images: [
      {
        url: 'https://shaikhfaiz.top/og-home.jpg', // ✅ Replace with real OG image
        width: 1200,
        height: 630,
        alt: 'Shaikh Faiz - Full Stack Developer Portfolio',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shaikh Faiz | Full Stack Developer & Mobile App Expert',
    description:
      'Hire Shaikh Faiz for web development, MERN stack, mobile apps, and IT services at affordable prices.',
    images: ['https://shaikhfaiz.top/og-home.jpg'], // ✅ Replace with OG image
    creator: '@yourtwitter', // replace with your Twitter if you have
  },
  metadataBase: new URL('https://shaikhfaiz.top'),
  alternates: {
    canonical: 'https://shaikhfaiz.top',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* ✅ Portfolio favicon & theme color */}
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#0f172a" />
        <meta name="application-name" content="Shaikh Faiz" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Shaikh Faiz" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <Providers>{children}</Providers>

        {/* ✅ Structured Data for Person */}
        <Script
          id="ld-json-person"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Shaikh Faiz',
              url: 'https://shaikhfaiz.top',
              image: 'https://shaikhfaiz.top/profile.jpg', // ✅ Replace with your profile photo
              jobTitle: 'Full Stack MERN Developer',
              description:
                'Shaikh Faiz is a Full Stack MERN Developer, Software & Mobile App Developer offering affordable IT services, web development, and mobile apps.',
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+91-9960669724x`', // ✅ Replace with your number if you want
                contactType: 'Customer Service',
                areaServed: 'Worldwide',
                availableLanguage: ['en', 'hi', 'mr'],
              },
              sameAs: [
                'https://github.com/iamfaiz55', // ✅ Replace with GitHub
                'https://www.linkedin.com/in/shaikhfaiz', // ✅ Replace with LinkedIn
                'https://twitter.com/iamfaiz55', // ✅ Replace with Twitter/X
                'https://www.instagram.com/iamfaizz55', // optional
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
