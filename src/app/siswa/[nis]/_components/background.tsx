import background from '-/../public/home.webp';
import { getBlurDataUrl } from '-/lib/utils';
import Image from 'next/image';
import React from 'react';

export default function BackgroundImage() {
  return (
    <div className='absolute right-0 top-0 -z-50 h-1/2 w-full overflow-hidden md:h-1/3'>
      {/* Background image will ignore the container */}
      <Image
        src={background}
        alt='background'
        className='relative'
        style={{ objectFit: 'cover', objectPosition: 'right', zIndex: -99 }}
        quality={20}
        priority
        fill
        sizes='100vw'
        placeholder='blur'
        blurDataURL={getBlurDataUrl()}
      />

      <div className='absolute bottom-0 left-0 h-full w-full bg-gradient-to-t from-background to-transparent' />

      <div className='absolute bottom-0 left-0 h-full w-full bg-gradient-to-b from-background via-background/80 to-background/70 dark:to-background/80' />
    </div>
  );
}
