import background from '-/../public/home.webp';
import { Typography } from '-/components/typography';
import { Button } from '-/components/ui/button';
import { Input } from '-/components/ui/input';
import Image from 'next/image';

export default function Home() {
  return (
    <section className='m-auto'>
      <div className='absolute left-0 top-0 -z-50 h-screen w-full overflow-hidden'>
        <Image
          src={background}
          alt='background'
          className='relative'
          priority
          fill
          style={{
            objectFit: 'cover',
            objectPosition: 'top',
            zIndex: -99,
          }}
        />

        <div className='absolute bottom-0 left-0 h-full w-full bg-gradient-to-t from-background to-background/40' />

        <div className='absolute bottom-0 left-0 h-full w-full bg-gradient-to-b from-background to-transparent' />
      </div>

      <div className='flex flex-col items-center justify-center'>
        <Typography
          types='h1'
          className='text-primary sm:text-5xl md:text-6xl lg:text-6xl'
        >
          SANTRIB
        </Typography>

        <Typography
          types='h3'
          className='text-xl sm:text-2xl md:text-3xl'
        >
          Aplikasi Santri Tertib
        </Typography>

        <Typography
          types='h4'
          className='text-md mt-2 font-light sm:text-lg md:text-xl'
        >
          Madina Boarding School Samarinda
        </Typography>

        <div className='flex w-full flex-col items-center justify-center gap-2'>
          <Input
            className='mt-4'
            placeholder='Search...'
          />

          <Button className='w-full'>Search</Button>
        </div>
      </div>
    </section>
  );
}
