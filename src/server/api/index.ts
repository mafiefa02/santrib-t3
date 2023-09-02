import { siswaRouter } from './routers/siswa';
import { createTRPCRouter } from './trpc';

export const appRouter = createTRPCRouter({
  siswa: siswaRouter,
});

export type AppRouter = typeof appRouter;
