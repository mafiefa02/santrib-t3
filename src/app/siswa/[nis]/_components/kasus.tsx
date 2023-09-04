'use client';

import LoadingSpinner from '-/components/loading-spinner';
import { Typography } from '-/components/typography';
import { Separator } from '-/components/ui/separator';
import { cn } from '-/lib/utils';
import { AppRouter } from '-/server/api';
import { trpc } from '-/trpc/client';
import { formatDistance } from 'date-fns';
import format from 'date-fns/format';
import { id } from 'date-fns/locale';
import { EyeIcon, UserIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import React from 'react';

import DeskripsiKasus from './deskripsi-kasus';

import type { inferRouterOutputs } from '@trpc/server';
type InitialDataType = inferRouterOutputs<AppRouter>;

type PoinSiswaProps = InitialDataType['kasus']['infiniteGetKasus'];

export default function Kasus({
  initialData,
}: {
  initialData: PoinSiswaProps;
}) {
  const { nis } = useParams() as { nis: string };
  const { status } = useSession();
  const { data, isFetching, dataUpdatedAt } =
    trpc.kasus.infiniteGetKasus.useInfiniteQuery(
      {
        limit: 5,
        nis,
      },
      {
        initialData: { pages: [initialData], pageParams: [] },
        getNextPageParam: (lastCursor) => lastCursor.nextCursor,
      },
    );

  const loggedIn = status === 'authenticated';

  if ((data?.pages.length === 1 && data.pages[0].items.length === 0) || !data) {
    return (
      <div className='flex w-full flex-col items-start gap-y-4'>
        <div className='flex items-center gap-2'>
          <p className='text-sm'>
            Terakhir diperbarui{' '}
            {formatDistance(new Date(dataUpdatedAt), new Date(), {
              locale: id,
            })}{' '}
            yang lalu.{' '}
          </p>

          {isFetching && <LoadingSpinner className='h-4 w-4' />}
        </div>

        <div className='flex w-full items-center justify-start rounded-md bg-muted/10 p-4 shadow hover:cursor-pointer hover:bg-muted/40 hover:shadow-md dark:hover:bg-muted/20'>
          <Typography
            types='h4'
            className='text-lg'
          >
            Tidak ada data
          </Typography>
        </div>
      </div>
    );
  }

  return (
    <div className='flex w-full flex-col items-start gap-y-4'>
      <div className='flex items-center gap-2'>
        <p className='text-sm'>
          Terakhir diperbarui{' '}
          {formatDistance(new Date(dataUpdatedAt), new Date(), { locale: id })}{' '}
          yang lalu.{' '}
        </p>

        {isFetching && <LoadingSpinner className='h-4 w-4' />}
      </div>

      {data?.pages.map((pages) =>
        pages.items.map((item) => (
          <div
            key={item.id}
            className='flex w-full flex-col items-start justify-between gap-2 rounded-md bg-muted/10 p-4 shadow hover:cursor-pointer hover:bg-muted/40 hover:shadow-md dark:hover:bg-muted/20'
          >
            <div className='flex w-full items-start justify-between gap-2'>
              <div className='flex w-full flex-col items-start justify-center gap-3'>
                <div className='flex w-full items-center justify-between gap-4 text-destructive md:hidden'>
                  <strong>Pelanggaran {item.pelanggaran.tipe}</strong>

                  <p className='font-semibold'>-{item.pelanggaran.poin}</p>
                </div>

                <div
                  className={cn(
                    loggedIn && 'text-sm',
                    'flex items-center gap-2',
                  )}
                >
                  <strong className='hidden text-destructive md:inline-block'>
                    Pelanggaran
                  </strong>

                  <p
                    className={cn(
                      'hidden sm:inline-block',
                      loggedIn && ' opacity-70',
                    )}
                  >
                    {format(
                      new Date(item.createdAt),
                      `eeee, MM MMMM yyyy 'pukul' HH:mm`,
                      {
                        locale: id,
                      },
                    )}
                  </p>

                  <p className={cn('sm:hidden', loggedIn && 'opacity-70')}>
                    {format(
                      new Date(item.createdAt),
                      `MM MMMM yyyy 'pukul' HH:mm`,
                      {
                        locale: id,
                      },
                    )}
                  </p>
                </div>

                <div
                  className={cn(
                    'flex flex-wrap items-center gap-x-4 gap-y-2',
                    loggedIn && 'text-sm',
                  )}
                >
                  <p className='opacity-70 md:opacity-100'>
                    <UserIcon
                      className='mr-1 inline-block'
                      size={16}
                    />{' '}
                    <span>{item.pelapor.name}</span>
                  </p>

                  <p className='opacity-70 md:opacity-100'>
                    <EyeIcon
                      className='mr-1 inline-block'
                      size={16}
                    />{' '}
                    {item.saksi ? (
                      <span>{item.saksi}</span>
                    ) : (
                      <span>Tidak ada</span>
                    )}
                  </p>
                </div>

                {loggedIn && (
                  <Typography
                    types='h4'
                    className='max-w-[60ch] text-lg'
                  >
                    {item.pelanggaran.nama}
                  </Typography>
                )}
              </div>

              <p className='hidden items-center gap-1 text-base font-semibold text-destructive md:flex'>
                <span className='mr-1'>{item.pelanggaran.tipe}</span> -
                {item.pelanggaran.poin} <span>poin</span>
              </p>
            </div>

            {loggedIn && <Separator className='my-2 md:hidden' />}

            <DeskripsiKasus
              deskripsi={item.deskripsi ?? 'Tidak ada deskripsi'}
            />
          </div>
        )),
      )}
    </div>
  );
}
