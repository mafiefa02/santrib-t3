import { prisma } from '-/prisma';
import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '../trpc';

export const kasusRouter = createTRPCRouter({
  infiniteGetKasus: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.number().nullish(),
        nis: z.string().nullish(),
      }),
    )
    .query(async ({ input }) => {
      const limit = 15;
      const cursor = input.cursor;

      if (!input.nis) {
        throw new Error('NIS tidak boleh kosong');
      }

      const items = await prisma.kasus
        .findMany({
          take: limit + 1,
          where: {
            siswaNis: input.nis,
          },
          include: {
            pelanggaran: {
              select: {
                nama: true,
                poin: true,
                tipe: true,
              },
            },
            pelapor: {
              select: {
                name: true,
              },
            },
          },
          cursor: cursor ? { id: cursor } : undefined,
          orderBy: {
            id: 'asc',
          },
        })
        .then((items) => {
          const hasMore = items.length > limit;
          const slicedItems = items.slice(0, limit);
          const nextCursor = hasMore ? items[limit].id : null;

          return {
            items: slicedItems,
            nextCursor,
          };
        });

      return items;
    }),
});
