import { prisma } from '-/prisma';
import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { Role } from '@prisma/client';

export const authOptions: AuthOptions = {
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { username, password } = credentials as {
          username: string;
          password: string;
        };

        if (!username || !password)
          throw new Error('Harap masukkan semua data.');

        const user = await prisma.guru.findUnique({
          where: {
            username,
          },
        });

        if (!user)
          throw new Error(
            `Tidak dapat menemukan akun dengan username ${username}`,
          );

        if (user.password !== password) throw new Error(`Password salah!`);

        return {
          id: user.id,
          name: user.name,
          username: user.username,
          role: user.role,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
        token.user = user;
      }

      return token;
    },
    async session({ session, token }) {
      const user = token.user as {
        id: string;
        name: string;
        username: string;
        role: Role;
        createdAt: Date;
        updatedAt: Date;
      };

      session.user = user;

      return session;
    },
  },
};
