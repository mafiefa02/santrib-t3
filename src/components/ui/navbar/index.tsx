import logo from '-/../public/logo.webp';
import ThemeSwitch from '-/components/theme-switch';
import { Typography } from '-/components/typography';
import SearchActiveContextProvider from '-/context/search-active-provider';
import { HomeIcon, SettingsIcon, User2Icon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import AuthButton from './auth-button';
import MobileNavButton from './mobile-nav-button';
import MobileSearchButton from './mobile-search-button';
import NavButton from './nav-button';
import SearchButton from './search-button';

const links = [
  {
    label: 'Home',
    href: '/',
    icon: (
      <HomeIcon
        className='hidden xs:block'
        size={16}
      />
    ),
  },
  {
    label: 'Manage',
    href: '/manage',
    icon: (
      <SettingsIcon
        className='hidden xs:block'
        size={16}
      />
    ),
  },
  {
    label: 'Siswa',
    href: '/siswa',
    icon: (
      <User2Icon
        className='hidden xs:block'
        size={16}
      />
    ),
  },
];

export default function NavigationBar() {
  return (
    <header className='sticky top-0 z-50 w-full bg-background shadow'>
      <nav className='container flex w-full items-center justify-between py-2'>
        <Link
          href='/'
          className='flex items-center gap-2'
        >
          <Image
            src={logo}
            alt='OSM'
            width={24}
            height={35}
          />
          <Typography
            types='h4'
            className='hidden text-primary xs:block'
          >
            Santri Tertib
          </Typography>
        </Link>

        <SearchActiveContextProvider>
          <div className='flex items-center gap-2'>
            {links.map((link, index) => (
              <NavButton
                link={link}
                key={index}
              />
            ))}

            <SearchButton />

            <ThemeSwitch />

            <AuthButton />
          </div>
        </SearchActiveContextProvider>
      </nav>

      <SearchActiveContextProvider>
        <MobileSearchButton />
      </SearchActiveContextProvider>

      <nav className='flex w-full items-center pt-3 md:hidden'>
        {links.map((link, index) => (
          <MobileNavButton
            key={index}
            link={link}
          />
        ))}
      </nav>
    </header>
  );
}
