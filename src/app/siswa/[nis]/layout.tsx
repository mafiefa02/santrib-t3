import React, { PropsWithChildren } from 'react';

import BackgroundImage from './_components/background';

export default function SiswaDetailsLayout({ children }: PropsWithChildren) {
  return (
    <section className='container'>
      <BackgroundImage />
      {children}
    </section>
  );
}
