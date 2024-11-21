import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
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
    icon: '/sands_logo.png',
    shortcut: '/sands_logo.png',
    apple: '/sands_logo.png',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="fixed inset-0 w-full overflow-y-auto overflow-x-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}
