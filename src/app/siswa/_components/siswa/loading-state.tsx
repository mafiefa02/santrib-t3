import { Skeleton } from '-/components/ui/skeleton';
import React from 'react';

export default function SiswaLoadingState() {
  return (
    <section className='mt-6 space-y-4'>
      {new Array(15).fill(0).map((_, i) => (
        <Skeleton
          key={i}
          className='h-[112px] rounded-md bg-muted/10 p-4 shadow only-of-type:border only-of-type:border-primary/20 hover:cursor-pointer hover:bg-muted/40 hover:shadow-md dark:hover:bg-muted/20 sm:h-[84px]'
        />
      ))}
    </section>
  );
}
