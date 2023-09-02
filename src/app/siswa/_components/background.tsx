import background from '-/../public/home.webp';
import Image from 'next/image';
import React from 'react';

export default function BackgroundImage() {
  return (
    <div className='absolute right-0 top-0 -z-50 h-1/3 w-full overflow-hidden'>
      {/* Background image will ignore the container */}
      <Image
        src={background}
        alt='background'
        className='relative'
        style={{ objectFit: 'cover', objectPosition: 'right', zIndex: -99 }}
        priority
        fill
      />

      <div className='absolute bottom-0 left-0 h-full w-full bg-gradient-to-t from-background to-transparent' />

      <div className='absolute bottom-0 left-0 h-full w-full bg-gradient-to-b from-background via-background/70 to-background/60 dark:to-background/70' />
    </div>
  );
}
