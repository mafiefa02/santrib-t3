'use client';

import { buttonVariants } from '-/components/ui/button';
import { Input } from '-/components/ui/input';
import { SearchIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import React, { useCallback, useState } from 'react';

export default function SearchParams() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const [search, setSearch] = useState(searchParams.get('search') ?? '');

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();

      let button = document.getElementById('search-button');
      button?.click();
    }
  }

  return (
    <div className='mt-8 flex w-full items-center justify-between'>
      <div className='flex w-full items-center gap-4'>
        <Input
          id='search'
          autoFocus
          defaultValue={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Cari nama atau NIS'
          onKeyDown={handleKeyDown}
        />

        <Link
          id='search-button'
          href={
            search !== ''
              ? pathname + '?' + createQueryString('search', search)
              : pathname
          }
          className={buttonVariants({ size: 'icon' })}
        >
          <SearchIcon
            className='shrink-0'
            size={18}
          />
        </Link>
      </div>
    </div>
  );
}
