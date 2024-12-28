import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  preload: true,
  display: 'swap',
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  preload: true,
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Saunders & Simmons | Web Design Somerset",
  description: "Get a beautiful website that brings you more customers. While you focus on what you do best. No upfront costs. Just results.",
  metadataBase: new URL('https://landing.saunders-simmons.co.uk'),
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://landing.saunders-simmons.co.uk',
    siteName: 'Saunders & Simmons',
    title: 'Saunders & Simmons | Web Design Somerset',
    description: 'Get a beautiful website that brings you more customers. While you focus on what you do best. No upfront costs. Just results.',
    images: [
      {
        url: '/sands_logo.png',
        width: 1200,
        height: 630,
        alt: 'Saunders & Simmons Web Design',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Saunders & Simmons | Web Design Somerset',
    description: 'Get a beautiful website that brings you more customers. While you focus on what you do best. No upfront costs. Just results.',
    images: ['/sands_logo.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/icon.png', sizes: '180x180' }
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
    other: [
      {
        rel: 'apple-touch-icon',
        url: '/apple-icon.png',
      }
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/sands_logo.png"
          as="image"
          type="image/png"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link
          rel="preload"
          href="/fonts/GeistVF.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
