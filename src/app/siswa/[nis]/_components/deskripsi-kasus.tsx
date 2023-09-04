'use client';

import { Button } from '-/components/ui/button';
import { cn } from '-/lib/utils';
import { ChevronDownIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';

export default function DeskripsiKasus({ deskripsi }: { deskripsi: string }) {
  const { status } = useSession();
  const [isExpanded, setIsExpanded] = useState(false);

  if (status === 'unauthenticated') return null;

  return (
    <div className='flex w-full flex-col items-start justify-between gap-x-8 gap-y-4 md:flex-row'>
      <article
        className={cn('text-md max-w-4xl overflow-hidden hover:cursor-text', {
          'line-clamp-1': !isExpanded,
          'line-clamp-none': isExpanded,
        })}
        dangerouslySetInnerHTML={{
          __html: deskripsi,
        }}
      />

      <Button
        variant='ghost'
        size='icon'
        className={cn('w-full shrink-0 text-right md:w-10')}
        onClick={() => setIsExpanded((prev) => !prev)}
      >
        <ChevronDownIcon
          className={cn('h-6 w-6 transition-transform', {
            'rotate-180 transform': isExpanded,
          })}
        />
      </Button>
    </div>
  );
}
