'use client';

import { Button } from '-/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '-/components/ui/form';
import { Input } from '-/components/ui/input';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';

const searchSchema = z.object({
  search: z.string(),
});

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function onSubmit(data: z.infer<typeof searchSchema>) {
    if (data.search === '') return router.push('/siswa');

    return router.push('/siswa?' + new URLSearchParams(data).toString());
  }

  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    mode: 'onSubmit',
    defaultValues: {
      search: searchParams.get('search') ?? '',
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex w-full flex-col items-center justify-center gap-2'
      >
        <FormField
          name='search'
          control={form.control}
          render={({ field }) => (
            <FormItem className='mt-4 w-full'>
              <FormControl>
                <Input
                  {...field}
                  id='search'
                  autoFocus
                  placeholder='Cari nama atau NIS'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          className='w-full'
          type='submit'
        >
          Search
        </Button>
      </form>
    </Form>
  );
}
