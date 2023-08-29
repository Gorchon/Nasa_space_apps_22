import { TRPCError } from '@trpc/server';
import { createNextApiHandler } from '@trpc/server/adapters/next';
import { hash } from 'argon2';
import { createContext } from 'server/context';
import dbConnect from 'server/dbConnect';
import { SessionUser } from 'server/helpers/auth';
import { DEFAULT_WALLET } from 'server/helpers/constants';
import { generatePaperFileName, storeFile } from 'server/helpers/fileUploads';
import { getFuzzySearchRegex } from 'server/helpers/mongoHelpers';
import { signUpSchema } from 'server/helpers/validation';
import Paper from 'server/schemas/Paper';
import PeerReview from 'server/schemas/PeerReview';
import User from 'server/schemas/User';
import { t } from 'server/trpc';
import { z } from 'zod';

const isAuthenticated = t.middleware(async ({ ctx, next }) => {
  // @ts-ignore
  if (!ctx.session.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next();
});

const appRouter = t.router({
  // Paper queries
  publishedPapers: t.procedure.query(async () => {
    await dbConnect();
    const papers = await Paper.find({ isPublished: true });
    return {
      papers,
    };
  }),
  pendingPapers: t.procedure.query(async () => {
    const papers = await Paper.find({ isPublished: false });
    return {
      papers,
    };
  }),
  paper: t.procedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input }) => {
      const foundPaper = await Paper.findOne({ _id: input.id });
      return {
        paper: foundPaper,
      };
    }),
  papersByAuthor: t.procedure
    .input(
      z.object({
        author: z.string(),
      })
    )
    .query(async ({ input }) => {
      const papers = await Paper.find({ author: input.author });
      return {
        papers,
      };
    }),
  searchPapers: t.procedure
    .input(z.object({ text: z.string() }))
    .query(async ({ input }) => {
      const papers = await Paper.find({
        title: getFuzzySearchRegex(input.text),
      });

      return {
        papers,
      };
    }),
  // Paper mutations
  createPaper: t.procedure
    .use(isAuthenticated)
    .input(
      z.object({
        file: z.string(),
        title: z.string(),
        description: z.string(),
      })
    )

    .mutation(async ({ ctx, input }) => {
      const filePath = storeFile(generatePaperFileName(), input.file);
      const paperResult = await Paper.create({
        author: (ctx.session.user as SessionUser)._id,
        title: input.title,
        description: input.description,
        filePath,
      });

      return { paper: paperResult };
    }),

  reviewPaper: t.procedure
    .use(isAuthenticated)
    .input(
      z.object({
        feedback: z.string(),
        trustWorthy: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = ctx.session.user as SessionUser;

      await PeerReview.create({
        feedback: input.feedback,
        trustWhorthy: input.trustWorthy,
        author: user._id,
      });

      return {
        success: true,
      };
    }),
  donate: t.procedure
    .input(
      z.object({
        from: z.string(),
        to: z.string(),
        amount: z.number(),
      })
    )
    .mutation(async () => {
      return {};
    }),

  // Auth
  signUp: t.procedure.input(signUpSchema).mutation(async ({ input, ctx }) => {
    const { username, password } = input;

    const exists = await User.findOne({ username });

    if (exists) {
      throw new Error('Username already exists');
    }

    const hashedPassword = await hash(password);

    await User.create({
      username,
      password: hashedPassword,
      wallet: DEFAULT_WALLET,
    });

    return {
      success: true,
    };
  }),

  //
  author: t.procedure
    .input(
      z.object({
        username: z.string(),
      })
    )
    .query(async ({ input }) => {
      const user = await User.findOne({ username: input.username });

      return {
        user,
      };
    }),
});

export type AppRouter = typeof appRouter;

export default createNextApiHandler({
  router: appRouter,
  createContext: createContext,
});
