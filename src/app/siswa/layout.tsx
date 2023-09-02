import NavigationBar from '-/components/ui/navbar';
import { Metadata } from 'next';
import React, { PropsWithChildren } from 'react';

export const metadata: Metadata = {
  title: 'Daftar Siswa',
  description:
    'Daftar seluruh siswa yang terdaftar di sekolah Madina Boarding School Samarinda.',
};

export default function SiswaPageLayout({ children }: PropsWithChildren) {
  return (
    <main className='flex min-h-screen flex-col'>
      <NavigationBar />
      {children}
    </main>
  );
}
