'use client';

import LoadingSpinner from '-/components/loading-spinner';
import { Typography } from '-/components/typography';
import { AppRouter } from '-/server/api';
import { trpc } from '-/trpc/client';
import Link from 'next/link';
import { notFound, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import SiswaCard from './siswa-card';

import type { inferRouterOutputs } from '@trpc/server';
type InitialDataType = inferRouterOutputs<AppRouter>;

export default function SiswaList({
  initialData,
}: {
  initialData: InitialDataType['siswa']['infiniteGetSiswa'];
}) {
  const { ref, inView } = useInView();
  const searchParams = useSearchParams();

  // Search params will be in the shape of 'filter=nama:burhanuddin_ahmad&filter=nis:10221&sort=nama:asc'

  const filter = searchParams
    .get('filter')
    ?.split('+')
    .map((item) => ({
      field: item.split(':')[0],
      value: item.split(':')[1].split('_').join(' '),
    }));

  const sort = searchParams
    .get('sort')
    ?.split('+')
    .map((item) => ({
      field: item.split(':')[0],
      order: item.split(':')[1],
    }));

  const search = searchParams.get('search');

  const {
    hasNextPage,
    data,
    fetchNextPage,
    isLoading,
    isFetchingNextPage,
    isError,
  } = trpc.siswa.infiniteGetSiswa.useInfiniteQuery(
    {
      filter: filter ?? [],
      sortBy: sort ?? [{ field: 'nis', order: 'asc' }],
      search: search ?? undefined,
    },
    {
      getNextPageParam: (lastCursor) => lastCursor.nextCursor,
      initialData: { pageParams: [], pages: [initialData] },
    },
  );

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, isFetchingNextPage, hasNextPage]);

  if (isLoading)
    return (
      <div className='flex flex-col items-start justify-start gap-y-2 rounded-md p-4 shadow hover:bg-muted/30 hover:shadow-md dark:hover:bg-muted/10'>
        <Typography types='h4'>Loading...</Typography>
      </div>
    );

  if (isError) return notFound();

  if (data.pages.length === 1 && !data?.pages[0].items.length) {
    return (
      <section className='mt-6 flex w-full items-center justify-center rounded-md py-8 shadow'>
        <Typography
          types='h4'
          className='max-w-[60ch]'
        >
          Siswa dengan nama atau NIS{' '}
          <span className='text-primary'>{searchParams.get('search')}</span>{' '}
          tidak ditemukan.
        </Typography>
      </section>
    );
  }

  return (
    <section className='mt-6 space-y-4'>
      {data?.pages.map((page) =>
        page.items.map((siswa, index) => {
          if (index === data?.pages[0].items.length - 1) {
            return (
              <SiswaCard
                ref={ref}
                key={siswa.id}
                href={`/siswa/${siswa.nis}`}
                siswa={siswa}
              />
            );
          }

          return (
            <SiswaCard
              key={siswa.id}
              href={`/siswa/${siswa.nis}`}
              siswa={siswa}
            />
          );
        }),
      )}

      {isFetchingNextPage && (
        <div className='flex flex-col items-start justify-start gap-y-2 rounded-md p-4 shadow hover:bg-muted/70 hover:shadow-md dark:hover:bg-muted/20'>
          <Typography
            types='h4'
            className='flex items-center gap-2'
          >
            Loading... <LoadingSpinner />
          </Typography>
        </div>
      )}
    </section>
  );
}
