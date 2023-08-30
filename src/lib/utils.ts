import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function getBaseUrl() {
  if (typeof window !== 'undefined')
    // Browser should use relative path
    return '';
  if (process.env.VERCEL_URL)
    // Reference for vercel.com
    return `https://${process.env.VERCEL_URL}`;
  // Assume localhost
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
