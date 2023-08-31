import background from '-/../public/home.webp';
import { Typography } from '-/components/typography';
import { Separator } from '-/components/ui/separator';
import Image from 'next/image';
import React from 'react';

import LoginForm from './_components/form/login';

export default function LoginPage() {
  return (
    <section className='container flex h-[calc(100vh-108px)] md:h-[calc(100vh-56px)]'>
      <div className='flex h-full w-full items-center justify-center lg:bg-background'>
        <div className='w-max lg:w-full lg:pr-36'>
          <Typography
            types='h1'
            className='w-full text-3xl text-primary sm:text-4xl'
          >
            Santri Tertib
          </Typography>

          <Typography
            types='h4'
            className='text-md w-full font-light sm:text-xl'
          >
            Madina Boarding School Samarinda
          </Typography>

          <Separator className='my-4' />

          <LoginForm />
        </div>
      </div>

      {/* To divide the login flexbox into two section */}
      <div className='hidden w-full items-center justify-center lg:flex' />

      {/* Background image will ignore the container */}
      <div className='absolute right-0 top-0 -z-50 h-screen w-full overflow-hidden lg:w-1/2'>
        <Image
          src={background}
          alt='background'
          className='relative'
          style={{ objectFit: 'cover', objectPosition: 'right', zIndex: -99 }}
          priority
          fill
        />

        <div className='absolute bottom-0 left-0 h-full w-full bg-gradient-to-b from-background to-transparent lg:bg-gradient-to-r' />

        <div className='absolute bottom-0 left-0 h-full w-full bg-gradient-to-t from-background to-background/60 lg:bg-gradient-to-l' />
      </div>
    </section>
  );
}
