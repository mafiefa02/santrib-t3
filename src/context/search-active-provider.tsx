'use client';

import React, { createContext, PropsWithChildren, useState } from 'react';

type SearchActiveContextType =
  | {
      searchActive: boolean;
      setSearchActive: React.Dispatch<React.SetStateAction<boolean>>;
    }
  | undefined;

export const SearchActiveContext =
  createContext<SearchActiveContextType>(undefined);

export default function SearchActiveContextProvider({
  children,
}: PropsWithChildren) {
  const [searchActive, setSearchActive] = useState(false);

  return (
    <SearchActiveContext.Provider value={{ searchActive, setSearchActive }}>
      {children}
    </SearchActiveContext.Provider>
  );
}
