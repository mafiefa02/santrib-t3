import React, { PropsWithChildren } from 'react';

export default function SiswaDetailsLayout({ children }: PropsWithChildren) {
  return <section className='container'>{children}</section>;
}
