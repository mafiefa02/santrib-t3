'use client';

import { trpc } from '-/trpc/client';

export default function Home() {
  const hello = trpc.example.hello.useQuery();
  const protectedHello = trpc.example.protected.useQuery();

  if (hello.isLoading)
    return (
      <main className='flex min-h-screen flex-col items-center justify-center'>
        Loading...
      </main>
    );

  return (
    <main className='flex min-h-screen flex-col items-center justify-center'>
      {hello.data && <h1>{hello.data}</h1>}
      {!protectedHello.isError && protectedHello.data && (
        <h1>{protectedHello.data}</h1>
      )}
    </main>
  );
}
