import { Inter } from 'next/font/google';
import '../styles/globals.css';
import '../styles/layout.css';
import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import { appConfig } from '@/constants/config';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://paddle-billing.vercel.app'),
  title: appConfig.title,
  description: `${appConfig.title} is designed to save time on your daily huddle or standup using AI to give an update so that you can stay in deep focus.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={'min-h-full dark'}>
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
