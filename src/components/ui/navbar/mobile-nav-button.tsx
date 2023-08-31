'use client';

import { cn } from '-/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import { Button } from '../button';

export default function MobileNavButton({
  link,
  index,
}: {
  link: {
    label: string;
    href: string;
    icon: React.ReactNode;
  };
  index: number;
}) {
  const pathname = usePathname();
  const active = pathname === link.href;

  return (
    <Button
      key={index}
      className={cn('flex-1 rounded-none text-sm', active && 'bg-accent/50')}
      variant='ghost'
      asChild
    >
      <Link
        href={link.href}
        className='flex w-full items-center gap-2'
      >
        {link.icon}
        <span>{link.label}</span>
      </Link>
    </Button>
  );
}
