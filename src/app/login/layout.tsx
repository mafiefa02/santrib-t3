import NavigationBar from '-/components/ui/navbar';
import { Metadata } from 'next';
import React, { PropsWithChildren } from 'react';

import BackgroundImage from './_components/background';

export const metadata: Metadata = {
  title: 'Login',
  description:
    'Halaman login aplikasi Santri Tertib Madina Boarding School Samarinda',
};

export default function LoginLayout({ children }: PropsWithChildren) {
  return (
    <main className='flex h-full min-h-screen flex-col overflow-hidden'>
      <BackgroundImage />
      <NavigationBar />
      {children}
    </main>
  );
}
