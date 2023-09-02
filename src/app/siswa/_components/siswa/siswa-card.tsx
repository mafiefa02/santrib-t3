import { Typography } from '-/components/typography';
import { AwardIcon, XCircleIcon } from 'lucide-react';
import Link, { LinkProps } from 'next/link';
import React from 'react';

import { Siswa } from '@prisma/client';

type SiswaCardProps = LinkProps & { siswa: Siswa };

const SiswaCard = React.forwardRef<HTMLAnchorElement, SiswaCardProps>(
  ({ siswa, href, ...props }, ref) => {
    return (
      <Link
        {...props}
        ref={ref}
        prefetch={false}
        href={href}
        key={siswa.id}
        className='flex flex-col items-start justify-center gap-y-2 rounded-md bg-muted/10 p-4 shadow only-of-type:border only-of-type:border-primary/20 hover:cursor-pointer hover:bg-muted/40 hover:shadow-md dark:hover:bg-muted/20 sm:flex-row sm:items-center sm:justify-between'
      >
        <div className='flex flex-col'>
          <Typography
            types='h4'
            className='text-lg xs:text-xl md:whitespace-nowrap'
          >
            {siswa.nama}
          </Typography>
          <div className='flex items-center gap-4 text-xs xs:text-sm'>
            <div className='hidden items-center gap-2 xs:flex'>
              <p className='font-semibold'>NIS</p>
              <p>{siswa.nis}</p>
            </div>

            <div className='flex items-center gap-2'>
              <p className='font-semibold'>Kelas</p>
              <p>{siswa.kelas}</p>
            </div>

            <div className='flex items-center gap-2'>
              <p className='font-semibold'>Asrama</p>
              <p>{siswa.asrama ?? '-'}</p>
            </div>
          </div>
        </div>

        <div className='flex items-center gap-4 text-sm md:text-base'>
          <div className='flex items-center gap-2'>
            <AwardIcon size={16} />
            <p>{siswa.poinPenghargaan}</p>
          </div>

          <div className='flex items-center gap-2 text-destructive'>
            <XCircleIcon size={16} />
            <p>{siswa.poinPelanggaran}</p>
          </div>
        </div>
      </Link>
    );
  },
);

SiswaCard.displayName = 'SiswaCard';

export default SiswaCard;
