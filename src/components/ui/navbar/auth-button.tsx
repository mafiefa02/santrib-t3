'use client';

import { Avatar, AvatarFallback } from '-/components/ui/avatar';
import { Button } from '-/components/ui/button';
import { Skeleton } from '-/components/ui/skeleton';
import { LogOutIcon } from 'lucide-react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';

export default function AuthButton() {
  const { status, data: session } = useSession();
  const pathname = usePathname();

  if (pathname === '/login') return null;

  switch (status) {
    case 'authenticated':
      return (
        <div className='flex items-center gap-3'>
          <Avatar className='h-9 w-9'>
            <AvatarFallback>{session?.user?.name?.[0] ?? '?'}</AvatarFallback>
          </Avatar>

          <Button
            onClick={() => signOut()}
            className='-ml-2 flex w-full items-center gap-3 p-3 md:pl-3 md:pr-4'
            variant='ghost'
            size='icon'
          >
            <p className='hidden max-w-[10ch] overflow-hidden text-ellipsis whitespace-nowrap text-sm md:block lg:max-w-[20ch]'>
              {session?.user?.name ?? 'Unknown'}
            </p>
            <LogOutIcon size={16} />
          </Button>
        </div>
      );

    case 'unauthenticated':
      return (
        <Button
          variant='outline'
          onClick={() => signIn()}
        >
          Sign In
        </Button>
      );

    default:
      return (
        <div className='flex items-center gap-3'>
          <Skeleton className='h-9 w-9 rounded-full' />

          <Skeleton className='h-9 w-9 rounded-full md:h-6 md:w-[8.4rem] md:rounded-lg' />
        </div>
      );
  }
}
