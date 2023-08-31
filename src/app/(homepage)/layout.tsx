import NavigationBar from '-/components/ui/navbar';
import React, { PropsWithChildren } from 'react';

export default function HomepageLayout({ children }: PropsWithChildren) {
  return (
    <main className='flex min-h-screen flex-col'>
      <NavigationBar />
      {children}
    </main>
  );
}
