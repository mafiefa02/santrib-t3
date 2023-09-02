'use client';

import { useSearchIsActive } from '-/hooks/useSearchIsActive';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

import { Button } from '../button';

export default function NavButton({
  link,
}: {
  link: { href: string; label: string };
}) {
  const { status } = useSession();
  const { searchActive } = useSearchIsActive();

  if (!(status === 'authenticated') && link.href === '/manage') return null;

  if (searchActive) return null;

  return (
    <Button
      variant='ghost'
      className='hidden first:hidden md:block'
      asChild
    >
      <Link href={link.href}>{link.label}</Link>
    </Button>
  );
}
