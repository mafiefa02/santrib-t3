'use client';

import LoadingSpinner from '-/components/loading-spinner';
import { AppRouter } from '-/server/api';
import { trpc } from '-/trpc/client';
import { TrophyIcon, XCircleIcon } from 'lucide-react';
import { useParams } from 'next/navigation';
import React from 'react';

import type { inferRouterOutputs } from '@trpc/server';
type InitialDataType = inferRouterOutputs<AppRouter>;

type PoinSiswaProps = InitialDataType['siswa']['getSiswa'];

export default function PoinSiswa({
  initialData,
}: {
  initialData?: PoinSiswaProps;
}) {
  const { nis } = useParams() as { nis: string };
  const { data, isFetching } = trpc.siswa.getSiswa.useQuery(
    { nis },
    { initialData },
  );

  if (!data)
    return (
      <div className='flex w-full items-center gap-3 md:w-max md:gap-2'>
        <div className='flex w-full items-center justify-center gap-2 rounded-sm border border-primary px-4 py-2 text-sm font-bold text-primary transition-all ease-in-out hover:cursor-pointer hover:bg-primary hover:text-primary-foreground md:w-max md:border-none md:bg-transparent md:text-foreground lg:text-base'>
          <TrophyIcon size={18} />
          <p>
            ??? <span className='hidden xs:inline-block'>poin</span>
          </p>
        </div>

        <div className='flex w-full items-center justify-center gap-2 rounded-sm border border-destructive px-4 py-2 text-sm font-bold text-destructive transition-all ease-in-out hover:cursor-pointer hover:bg-destructive hover:text-destructive-foreground md:w-max md:border-none md:bg-transparent md:text-foreground lg:text-base'>
          <XCircleIcon size={18} />
          <p>
            ??? <span className='hidden xs:inline-block'>poin</span>
          </p>
        </div>
      </div>
    );

  return (
    <div className='flex w-full items-center gap-3 md:w-max md:gap-2'>
      <div className='flex w-full items-center justify-center gap-2 rounded-sm border border-primary px-4 py-2 text-sm font-bold text-primary transition-all ease-in-out hover:cursor-pointer hover:bg-primary hover:text-primary-foreground md:w-max md:border-none md:bg-transparent md:text-foreground lg:text-base'>
        {isFetching ? (
          <LoadingSpinner className='h-4 w-4' />
        ) : (
          <TrophyIcon size={18} />
        )}
        <p>
          {data.poinPenghargaan}{' '}
          <span className='hidden xs:inline-block'>poin</span>
        </p>
      </div>

      <div className='flex w-full items-center justify-center gap-2 rounded-sm border border-destructive px-4 py-2 text-sm font-bold text-destructive transition-all ease-in-out hover:cursor-pointer hover:bg-destructive hover:text-destructive-foreground md:w-max md:border-none md:bg-transparent md:text-foreground lg:text-base'>
        {isFetching ? (
          <LoadingSpinner className='h-4 w-4' />
        ) : (
          <XCircleIcon size={18} />
        )}
        <p>
          {data.poinPelanggaran}{' '}
          <span className='hidden xs:inline-block'>poin</span>
        </p>
      </div>
    </div>
  );
}
