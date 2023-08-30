import { prisma } from '-/prisma';
import { appRouter } from '-/server/api';

import { Role } from '@prisma/client';

if (!process.env.ADMINISTRATOR_USERID)
  throw new Error('ADMINISTRATOR_USERID is not set');

export const trpcServer = appRouter.createCaller({
  session: {
    user: {
      id: process.env.ADMINISTRATOR_USERID,
      name: 'Admin Santrib',
      role: Role.ADMIN,
      createdAt: new Date('2023-08-19T02:50:40.147Z'),
      updatedAt: new Date('2023-08-19T04:14:27.228Z'),
      username: 'santrib',
    },
    expires: '2100-10-01T00:00:00.000Z',
  },
  prisma,
});
