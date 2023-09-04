import background from '-/../public/home.webp';
import Image from 'next/image';
import React from 'react';

export default function BackgroundImage() {
  return (
    <div className='absolute left-0 top-0 -z-50 h-screen w-full overflow-hidden'>
      <Image
        src={background}
        alt='background'
        className='relative'
        priority
        fill
        sizes='100vw'
        style={{
          objectFit: 'cover',
          objectPosition: 'top',
          zIndex: -99,
        }}
      />

      <div className='absolute bottom-0 left-0 h-full w-full bg-gradient-to-t from-background via-background/80 to-primary/40 dark:via-background/70 dark:to-background/40' />

      <div className='absolute bottom-0 left-0 h-full w-full bg-gradient-to-b from-background via-primary/20 to-transparent dark:via-primary/5' />
    </div>
  );
}
