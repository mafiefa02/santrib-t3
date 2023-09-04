import { Typography } from '-/components/typography';
import { Button } from '-/components/ui/button';
import { Input } from '-/components/ui/input';
import { trpcServer } from '-/trpc/server';
import { SearchIcon } from 'lucide-react';
import React, { Suspense } from 'react';

import BackgroundImage from './_components/background';
import SearchParams from './_components/search';
import SiswaList from './_components/siswa';
import SiswaLoadingState from './_components/siswa/loading-state';

export default async function SiswaPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const { search, sort, filter } = searchParams;

  const { items, nextCursor } = await trpcServer.siswa.infiniteGetSiswa({
    limit: 15,
    search,

    sortBy: sort
      ? Array(sort).map((item) => ({
          field: item.split(':')[0],
          order: item.split(':')[1],
        }))
      : [{ field: 'nama', order: 'asc' }],

    filter: filter
      ? Array(filter).map((item) => ({
          field: item.split(':')[0],
          value: item.split(':')[1].split('_').join(' '),
        }))
      : [],
  });

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

      <Suspense
        fallback={
          <div className='mt-8 flex w-full items-center justify-between'>
            <div className='flex w-full items-center gap-4'>
              <Input
                id='search'
                autoFocus
                defaultValue={search}
                placeholder='Cari nama atau NIS'
              />

              <Button
                size='icon'
                disabled
              >
                <SearchIcon size={18} />
              </Button>
            </div>
          </div>
        }
      >
        <SearchParams />
      </Suspense>

      <Suspense fallback={<SiswaLoadingState />}>
        <SiswaList initialData={{ items, nextCursor }} />
      </Suspense>
    </section>
  );
}
