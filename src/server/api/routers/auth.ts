import { signIn } from 'next-auth/react';
import { z } from 'zod';

import { TRPCError } from '@trpc/server';

import { createTRPCRouter, publicProcedure } from '../trpc';

export const authRouter = createTRPCRouter({
  login: publicProcedure
    .input(
      z.object({
        username: z
          .string({ required_error: 'Tidak boleh kosong.' })
          .min(3, { message: 'Minimal 3 karakter.' })
          .max(255, { message: 'Maksimal 255 karakter.' }),
        password: z
          .string({ required_error: 'Tidak boleh kosong.' })
          .min(6, { message: 'Minimal 6 karakter' })
          .max(255, {
            message: 'Maksimal 255 karakter.',
          }),
      }),
    )
    .mutation(async ({ input }) => {
      const res = await signIn('credentials', {
        ...input,
      });

      if (!res) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Silakan coba kembali',
        });
      }

      if (!res.ok) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: res.error ?? 'Terjadi kesalahan, silakan coba kembali.',
        });
      }

      return res;
    }),
});
