import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { unstable_getServerSession } from 'next-auth';
import { nextAuthOptions } from 'server/helpers/auth';
import dbConnect from './dbConnect';

export async function createContext(ctx: trpcNext.CreateNextContextOptions) {
  const { req, res } = ctx;

  await dbConnect();
  const session = await unstable_getServerSession(req, res, nextAuthOptions);

  return {
    req,
    res,
    session,
  };
}

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
