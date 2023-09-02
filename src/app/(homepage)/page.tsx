import LoadingSpinner from '-/components/loading-spinner';
import { Typography } from '-/components/typography';
import { Button } from '-/components/ui/button';
import { Input } from '-/components/ui/input';
import { Suspense } from 'react';

import BackgroundImage from './_components/background';
import SearchBar from './_components/search/index';

export default async function Home() {
  return (
    <section className='m-auto'>
      <BackgroundImage />

      <div className='flex flex-col items-center justify-center py-16'>
        <Typography
          types='h1'
          className='text-5xl text-primary drop-shadow-md md:text-7xl lg:text-7xl'
        >
          SANTRIB
        </Typography>

        <Typography
          types='h3'
          className='text-2xl md:text-4xl'
        >
          Aplikasi Santri Tertib
        </Typography>

        <Typography
          types='h4'
          className='text-md mt-2 font-normal dark:font-light sm:text-lg md:text-2xl'
        >
          Madina Boarding School Samarinda
        </Typography>

        <Suspense
          fallback={
            <div className='flex w-full flex-col items-center justify-center gap-2'>
              <Input
                id='search'
                className='mt-4'
                placeholder='Cari nama atau NIS'
              />

              <Button
                className='flex w-full items-center gap-2'
                disabled
              >
                <LoadingSpinner /> Loading...
              </Button>
            </div>
          }
        >
          <SearchBar />
        </Suspense>
      </div>
    </section>
  );
}
