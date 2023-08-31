'use client';

import LoadingSpinner from '-/components/loading-spinner';
import { Button } from '-/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '-/components/ui/form';
import { Input } from '-/components/ui/input';
import { useToast } from '-/components/ui/toast/use-toast';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { defaultValues, schema } from './schema';

import type { FormValues } from './schema';

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: 'onSubmit',
  });

  async function onSubmit(data: FormValues) {
    setLoading(true);
    const res = await signIn('credentials', { ...data, redirect: false });

    if (!res) {
      setLoading(false);
      toast({
        title: 'Login gagal!',
        description: 'Silakan coba kembali.',
        variant: 'destructive',
      });

      return;
    }

    if (res.error) {
      setLoading(false);
      toast({
        title: res.error,
        variant: 'destructive',
      });

      return;
    }

    return router.push('/');
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='w-full space-y-4'
      >
        <FormField
          name='username'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  type='text'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name='password'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type='password'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          disabled={loading}
          type='submit'
          className='w-full space-x-2'
        >
          {loading ? (
            <>
              <LoadingSpinner />
              <p>Loading...</p>
            </>
          ) : (
            'Login'
          )}
        </Button>
      </form>
    </Form>
  );
}
