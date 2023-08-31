import './globals.css';

import { Toaster } from '-/components/ui/toast/toaster';
import NextAuthProvider from '-/context/next-auth-provider';
import { NextThemeProvider } from '-/context/next-theme-provider';
import TRPCProvider from '-/trpc/trpc-provider';
import { Inter } from 'next/font/google';

import type { Metadata } from 'next';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://santrib.mbss.sch.id'),
  title: {
    template: '%s | Santri Tertib',
    default: 'Santri Tertib | Madina Boarding School Samarinda',
  },
  publisher: 'MBSS',
  creator: 'Madina Boarding School Samarinda',
  keywords: [
    'Aplikasi Santri Tertib',
    'Santri Tertib',
    'Penghargaan santri',
    'Pelanggaran santri',
    'Disiplin',
    'Madina Boarding School Samarinda',
    'Santrib',
    'MBSS',
    'MBSS Samarinda',
    'Santri Tertib Madina Boarding School Samarinda',
    'Santri Tertib MBSS Samarinda',
    'Santri Tertib MBSS',
    'Santri Tertib Madina Boarding School',
    'Aplikasi Santri Tertib Madina Boarding School Samarinda',
    'Aplikasi Santri Tertib MBSS Samarinda',
    'Aplikasi Santri Tertib MBSS',
  ],
  alternates: {
    canonical: '/',
  },
  description:
    'Sebuah aplikasi yang digunakan sebagai media pemantauan pelanggaran dan penghargaan santri di Madina Boarding School Samarinda.',
  openGraph: {
    title: 'Santri Tertib | Madina Boarding School Samarinda',
    description:
      'Sebuah aplikasi yang digunakan sebagai media pemantauan pelanggaran dan penghargaan santri di Madina Boarding School Samarinda.',
    url: 'https://santrib.mbss.sch.id',
    siteName: 'Aplikasi Santri Tertib | Madina Boarding School Samarinda',
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    title: 'Santri Tertib | Madina Boarding School Samarinda',
    description:
      'Sebuah aplikasi yang digunakan sebagai media pemantauan pelanggaran dan penghargaan santri di Madina Boarding School Samarinda.',
    creator: 'Madina Boarding School Samarinda',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='id'>
      <body className={inter.className}>
        <NextAuthProvider>
          <TRPCProvider>
            <NextThemeProvider
              attribute='class'
              defaultTheme='dark'
            >
              {children}
              <Toaster />
            </NextThemeProvider>
          </TRPCProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
