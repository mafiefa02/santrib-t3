import { kasusRouter } from './routers/kasus';
import { siswaRouter } from './routers/siswa';
import { createTRPCRouter } from './trpc';

export const appRouter = createTRPCRouter({
  siswa: siswaRouter,
  kasus: kasusRouter,
});

export type AppRouter = typeof appRouter;
