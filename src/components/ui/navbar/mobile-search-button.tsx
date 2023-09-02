'use client';

import { useSearchIsActive } from '-/hooks/useSearchIsActive';
import { cn } from '-/lib/utils';
import { SearchIcon, XIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Button, buttonVariants } from '../button';
import { Input } from '../input';

export default function MobileSearchButton() {
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

      let button = document.getElementById('mobile-search-button');
      button?.click();
    }

    if (e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();

      setSearchActive(false);
    }
  }

  return (
    <nav className='container flex w-full items-center pt-3 md:hidden'>
      <div className='flex w-full items-center gap-4 md:hidden'>
        <Input
          id='search'
          placeholder='Cari nama atau NIS'
          value={search}
          className='transition-all duration-300 ease-in-out'
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setSearchActive(true)}
          onKeyDown={handleKeyPress}
        />

        {searchActive && (
          <div className='flex items-center gap-2'>
            <Link
              id='mobile-search-button'
              className={cn(
                buttonVariants({ size: 'icon', variant: 'ghost' }),
                'hover:bg-primary hover:text-primary-foreground',
              )}
              onClick={() => setSearchActive(false)}
              href={
                search
                  ? '/siswa?' + new URLSearchParams({ search }).toString()
                  : '/siswa'
              }
            >
              <SearchIcon size={18} />
            </Link>

            <Button
              variant='ghost'
              className='hover:bg-destructive hover:text-destructive-foreground'
              onClick={() => setSearchActive(false)}
            >
              <XIcon size={18} />
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
