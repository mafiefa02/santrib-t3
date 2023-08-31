'use client';

import { cn } from '-/lib/utils';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import { Button } from '../button';

export default function MobileNavButton({
  link,
}: {
  link: {
    label: string;
    href: string;
    icon: React.ReactNode;
  };
}) {
  const pathname = usePathname();
  const active = pathname === link.href;

  const { status } = useSession();

  if (!(status === 'authenticated') && link.href === '/manage') return null;

  return (
    <Button
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
