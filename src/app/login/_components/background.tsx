import background from '-/../public/home.webp';
import { getBlurDataUrl } from '-/lib/utils';
import Image from 'next/image';
import React from 'react';

export default function BackgroundImage() {
  return (
    <div className='absolute right-0 top-0 -z-50 h-full min-h-screen w-full overflow-hidden lg:w-1/2'>
      {/* Background image will ignore the container */}
      <Image
        src={background}
        alt='background'
        className='relative'
        style={{ objectFit: 'cover', objectPosition: 'right', zIndex: -99 }}
        priority
        fill
        sizes='100vw'
        placeholder='blur'
        blurDataURL={getBlurDataUrl()}
      />

      <div className='absolute bottom-0 left-0 h-full w-full bg-gradient-to-b from-background to-transparent lg:bg-gradient-to-r' />

      <div className='absolute bottom-0 left-0 h-full w-full bg-gradient-to-t from-background/70 to-background/50 dark:from-background/80 dark:to-background/50 lg:bg-gradient-to-l lg:from-background/30 lg:to-background/10' />
    </div>
  );
}
