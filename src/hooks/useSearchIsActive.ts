import { SearchActiveContext } from '-/context/search-active-provider';
import { useContext } from 'react';

export function useSearchIsActive() {
  const context = useContext(SearchActiveContext);

  if (!context) {
    throw new Error(
      'useSearchIsActive must be used within a SearchActiveProvider',
    );
  }

  return context;
}
