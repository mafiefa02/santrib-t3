import { Typography } from '-/components/typography';
import { Separator } from '-/components/ui/separator';
import Image from 'next/image';
import React from 'react';

import BackgroundImage from './_components/background';
import LoginForm from './_components/form/login';

export default function LoginPage() {
  return (
    <section className='flex h-[calc(100vh-108px)] w-full overflow-y-auto lg:container md:h-[calc(100vh-56px)]'>
      <div className='flex h-full min-h-max w-full items-center justify-center overflow-hidden px-2 pb-32 pt-[calc(108px+4rem)] md:pt-[calc(56px+4rem)] lg:bg-background'>
        <div className='min-h-max w-max lg:w-full lg:pr-32'>
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
    </section>
  );
}
