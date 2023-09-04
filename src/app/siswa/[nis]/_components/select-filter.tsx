'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '-/components/ui/select';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

export default function SelectFilter() {
  const params = useSearchParams();
  const filter = params.get('filter') ?? 'all';
  const router = useRouter();

  const { nis } = useParams();

  function handleChange(value: string) {
    if (value === 'all') {
      router.push('/siswa/' + nis);
    } else if (value === 'penghargaan') {
      router.push('/siswa/' + nis + '?filter=penghargaan');
    } else if (value === 'pelanggaran') {
      router.push('/siswa/' + nis + '?filter=pelanggaran');
    }
  }

  return (
    <Select
      defaultValue={filter}
      onValueChange={handleChange}
    >
      <SelectTrigger className='w-full md:max-w-xs'>
        <SelectValue placeholder='Filter tampilan' />
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
  );
}
