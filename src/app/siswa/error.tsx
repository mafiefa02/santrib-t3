'use client'; // Error components must be Client Components

import { Typography } from '-/components/typography';
import { Button } from '-/components/ui/button';
import { Input } from '-/components/ui/input';
import { SearchIcon } from 'lucide-react';

import BackgroundImage from './_components/background';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <section className='container py-16'>
      <BackgroundImage />

      <Typography
        types='h1'
        className='text-primary'
      >
        Daftar Siswa
      </Typography>

      <Typography className='font-normal'>
        Daftar seluruh siswa yang terdaftar di sekolah Madina Boarding School
        Samarinda.
      </Typography>

      <div className='mt-8 flex w-full items-center justify-between'>
        <div className='flex w-full items-center gap-4'>
          <Input placeholder='Cari nama atau NIS' />

          <Button
            size='icon'
            disabled
          >
            <SearchIcon size={18} />
          </Button>
        </div>
      </div>

      <div className='mt-6 flex w-full items-center justify-center rounded-md py-8 shadow'>
        <Typography
          types='h4'
          className='max-w-[60ch]'
        >
          Terjadi kesalahan saat memuat halaman ini. Silahkan{' '}
          <Button
            onClick={reset}
            variant={'link'}
            asChild
          >
            <span>coba lagi.</span>
          </Button>
          .
        </Typography>
      </div>

      <div className='mt-6 flex w-full items-center justify-center rounded-md py-8 shadow'>
        <Typography
          types='h4'
          className='max-w-[60ch]'
        >
          {error.message}
        </Typography>
      </div>
    </section>
  );
}
