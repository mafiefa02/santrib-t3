import { prisma } from '-/prisma';
import { z } from 'zod';

import { TRPCError } from '@trpc/server';

import { createTRPCRouter, publicProcedure } from '../trpc';

export const siswaRouter = createTRPCRouter({
  infiniteGetSiswa: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(),
        filter: z.array(
          z.object({
            field: z.string(),
            value: z.string(),
          }),
        ),
        search: z.string().nullish(),
        sortBy: z
          .array(
            z.object({
              field: z.string(),
              order: z.string(),
            }),
          )
          .nullish(),
      }),
    )
    .query(async ({ input }) => {
      const limit = 15;
      const cursor = input.cursor;

      const items = await prisma.siswa
        .findMany({
          take: limit + 1,
          where: {
            AND: input.filter.map((filter) => ({
              [filter.field]: {
                contains: filter.value,
              },
            })),
            OR: [
              {
                nama: {
                  contains: input.search ?? '',
                },
              },
              {
                nis: {
                  startsWith: input.search ?? '',
                },
              },
            ],
          },
          cursor: cursor ? { nis: cursor } : undefined,
          orderBy: input.sortBy?.map((sortBy) => ({
            [sortBy.field]: sortBy.order,
          })),
        })
        .catch((err: Error) => {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            cause: err.cause,
            message: err.message,
          });
        });

      let nextCursor: typeof cursor | undefined = undefined;

      if (items.length > limit) {
        const nextItem = items.pop();
        nextCursor = nextItem!.nis;
      }

      return {
        items,
        nextCursor,
      };
    }),
});
