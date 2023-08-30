import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc';

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure.query(async () => 'Hello World!'),
  protected: protectedProcedure.query(
    async (ctx) => `Hello, ${ctx.ctx.session.user.name}`,
  ),
});
