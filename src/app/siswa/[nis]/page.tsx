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
import { prisma } from '-/prisma';
import { trpcServer } from '-/trpc/server';
import { BookOpen, SchoolIcon } from 'lucide-react';
import React, { Suspense } from 'react';

import Kasus from './_components/kasus';
import PoinSiswa from './_components/poin';
import SelectFilter from './_components/select-filter';

export const revalidate = 3600;

export async function generateStaticParams() {
  const students = await prisma.siswa.findMany({
    select: { nis: true },
  });

  return students.map((student) => ({
    nis: student.nis,
  }));
}

export default async function SiswaDetailsPage({
  params,
}: {
  params: { nis: string };
}) {
  const { nis } = params;

  const siswa = await trpcServer.siswa.getSiswa({ nis });
  const kasus = await trpcServer.kasus.infiniteGetKasus({
    nis,
    limit: 5,
    cursor: null,
  });

  return (
    <section className='w-full space-y-12 py-16 md:space-y-6'>
      <div className='flex w-full flex-col items-start justify-center gap-x-6 gap-y-3 md:flex-row md:items-end md:justify-between'>
        <div className='flex flex-col items-start justify-center gap-2 overflow-hidden'>
          <div className='flex items-center gap-4'>
            <div className='flex items-center gap-2 text-sm md:text-base'>
              <strong>NIS</strong>
              <p>{siswa.nis}</p>
            </div>

            <div className='flex items-center gap-2 text-sm md:text-base'>
              <BookOpen size={16} />
              <strong className='hidden xs:block'>Kelas</strong>
              <p>{siswa.kelas}</p>
            </div>

            <div className='flex items-center gap-2 text-sm md:text-base'>
              <SchoolIcon size={16} />
              <strong className='hidden xs:block'>Asrama</strong>
              <p>{siswa.asrama ?? '-'}</p>
            </div>
          </div>

          <span className='w-full overflow-hidden py-1 md:max-w-[60ch]'>
            <Typography
              types='h1'
              className='text-primary'
            >
              {siswa.nama}
            </Typography>
          </span>
        </div>

        <PoinSiswa initialData={siswa} />
      </div>

      <div className='flex w-full flex-col items-start gap-y-2 md:flex-row md:items-center md:justify-between'>
        <Typography
          types='h2'
          className='border-none font-extrabold'
        >
          Riwayat Poin Siswa
        </Typography>

        <Suspense
          fallback={
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
          }
        >
          <SelectFilter />
        </Suspense>
      </div>

      <Kasus initialData={kasus} />
    </section>
  );
}
