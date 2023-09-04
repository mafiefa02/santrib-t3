'use client';

import { useMounted } from "-/hooks/useMounted";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();

  // Avoid layout shift for SSR
  if (!mounted) return <Skeleton className='mr-2 h-9 w-9 rounded-full' />;

  switch (theme) {
    case 'light':
      return (
        <Button
          id='dark-theme-switch'
          name='dark-theme-switch'
          aria-label='theme-switch'
          className='mr-2'
          size={'icon'}
          variant={'ghost'}
          onClick={() => setTheme('dark')}
        >
          <SunIcon className='h-5 w-5' />
        </Button>
      );

    case 'dark':
      return (
        <Button
          id='light-theme-switch'
          name='light-theme-switch'
          aria-label='theme-switch'
          className='mr-2'
          size={'icon'}
          variant={'ghost'}
          onClick={() => setTheme('light')}
        >
          <MoonIcon className='h-5 w-5' />
        </Button>
      );

    default:
      return <Skeleton className='mr-2 h-9 w-9 rounded-full' />;
  }
}
