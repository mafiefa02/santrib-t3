import { Typography } from '-/components/typography';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '-/components/ui/select';
import { Skeleton } from '-/components/ui/skeleton';
import { formatDistance } from 'date-fns';
import { id } from 'date-fns/locale';
import { BookOpen, SchoolIcon, TrophyIcon, XCircleIcon } from 'lucide-react';
import React from 'react';

export default function LoadingSiswaDynamicPage() {
  return (
    <section className='w-full space-y-12 py-16 md:space-y-6'>
      <div className='flex w-full flex-col items-start justify-center gap-x-6 gap-y-3 md:flex-row md:items-end md:justify-between'>
        <div className='flex flex-col items-start justify-center gap-2 overflow-hidden'>
          <div className='flex items-center gap-4'>
            <div className='flex items-center gap-2 text-sm md:text-base'>
              <strong>NIS</strong>
              <Skeleton className='h-5 w-[4ch] md:h-6' />
            </div>

            <div className='flex items-center gap-2 text-sm md:text-base'>
              <BookOpen size={16} />
              <strong className='hidden xs:block'>Kelas</strong>
              <Skeleton className='h-5 w-[6ch] md:h-6' />
            </div>

            <div className='flex items-center gap-2 text-sm md:text-base'>
              <SchoolIcon size={16} />
              <strong className='hidden xs:block'>Asrama</strong>
              <Skeleton className='h-5 w-[4ch] md:h-6' />
            </div>
          </div>

          <span className='w-full overflow-hidden py-1 md:max-w-[60ch]'>
            <Skeleton className='h-10 w-[20ch] lg:h-12' />
          </span>
        </div>

        <div className='flex w-full items-center gap-3 md:w-max md:gap-2'>
          <div className='flex w-full items-center justify-center gap-2 rounded-sm border border-primary px-4 py-2 text-sm font-bold text-primary transition-all ease-in-out hover:cursor-pointer hover:bg-primary hover:text-primary-foreground md:w-max md:border-none md:bg-transparent md:text-foreground lg:text-base'>
            <TrophyIcon size={18} />
            <Skeleton className='h-5 w-[6ch] md:h-6' />
          </div>

          <div className='flex w-full items-center justify-center gap-2 rounded-sm border border-destructive px-4 py-2 text-sm font-bold text-destructive transition-all ease-in-out hover:cursor-pointer hover:bg-destructive hover:text-destructive-foreground md:w-max md:border-none md:bg-transparent md:text-foreground lg:text-base'>
            <XCircleIcon size={18} />
            <Skeleton className='h-5 w-[6ch] md:h-6' />
          </div>
        </div>
      </div>

      <div className='flex w-full flex-col items-start gap-y-2 md:flex-row md:items-center md:justify-between'>
        <Typography
          types='h2'
          className='border-none font-extrabold'
        >
          Riwayat Poin Siswa
        </Typography>

        <Select value='all'>
          <SelectTrigger className='w-full md:max-w-xs'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Filter Tampilan</SelectLabel>
              <SelectItem value='all'>Tampilkan semua</SelectItem>
              <SelectItem value='penghargaan'>Penghargaan</SelectItem>
              <SelectItem value='pelanggaran'>Pelanggaran</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <p className='text-sm'>
        Terakhir diperbarui{' '}
        {formatDistance(new Date(), new Date(), { locale: id })} yang lalu.
      </p>

      {Array(5)
        .fill(0)
        .map((_, i) => (
          <Skeleton
            key={i}
            className='flex h-[172px] w-full flex-col items-start justify-between gap-2 rounded-md bg-muted/10 p-4 shadow hover:cursor-pointer hover:bg-muted/40 hover:shadow-md dark:hover:bg-muted/20'
          />
        ))}
    </section>
  );
}
