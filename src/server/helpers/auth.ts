import { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { verify } from 'argon2';
import { loginSchema } from 'server/helpers/validation';
import User from 'server/schemas/User';

export interface SessionUser {
  username: string;
  _id: string;
}

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        username: {
          label: 'Username',
          type: 'username',
          placeholder: 'jose@opitrust.org',
        },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials, request) => {
        const creds = await loginSchema.parseAsync(credentials);

        const userResult = await User.findOne({
          username: creds.username,
        }).select('username password');

        if (!userResult) {
          return null;
        }

        const isValidPassword = await verify(
          userResult.password,
          creds.password
        );

        if (!isValidPassword) {
          return null;
        }

        return {
          _id: userResult._id,
          username: userResult.username,
        } as SessionUser;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token._id = user._id;
        token.username = user.username;
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.id = token.id;
      }

      return session;
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    maxAge: 15 * 24 * 30 * 60, // 15 days
  },
  pages: {
    signIn: '/',
    newUser: '/sign-up',
  },
};
