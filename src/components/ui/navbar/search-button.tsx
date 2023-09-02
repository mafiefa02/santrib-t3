'use client';

import { Button, buttonVariants } from '-/components/ui/button';
import { useSearchIsActive } from '-/hooks/useSearchIsActive';
import { cn } from '-/lib/utils';
import { SearchIcon, XIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { Input } from '../input';

export default function SearchButton() {
  const { searchActive, setSearchActive } = useSearchIsActive();
  const [search, setSearch] = useState('');

  const pathname = usePathname();

  useEffect(() => {
    if (!searchActive) {
      setSearch('');
    }
  }, [searchActive]);

  if (pathname === '/siswa' || !pathname.startsWith('/siswa')) return null;

  function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();

      let button = document.getElementById('nav-search-button');
      button?.click();
    }

    if (e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();

      setSearchActive(false);
    }
  }

  return (
    <div className='hidden items-center gap-4 md:flex'>
      {searchActive && (
        <Input
          id='search'
          onChange={(e) => setSearch(e.target.value)}
          autoFocus
          placeholder='Cari nama atau NIS'
          onKeyDown={handleKeyPress}
        />
      )}

      {searchActive ? (
        <div className='flex items-center gap-2'>
          <Button
            size='icon'
            variant='ghost'
            className='hover:bg-destructive hover:text-destructive-foreground'
            onClick={() => setSearchActive(false)}
          >
            <XIcon size={18} />
          </Button>

          <Link
            id='nav-search-button'
            href={search !== '' ? '/siswa' + '?search=' + search : '/siswa'}
            className={cn(
              buttonVariants({ size: 'icon', variant: 'ghost' }),
              'hover:bg-primary hover:text-primary-foreground',
            )}
            onClick={() => setSearchActive(false)}
          >
            <SearchIcon size={18} />
          </Link>
        </div>
      ) : (
        <Button
          size='icon'
          variant='ghost'
          onClick={() => setSearchActive(!searchActive)}
        >
          <SearchIcon size={18} />
        </Button>
      )}
    </div>
  );
}
