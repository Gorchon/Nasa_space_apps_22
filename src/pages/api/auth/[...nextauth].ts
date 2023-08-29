import NextAuth from 'next-auth';

import { nextAuthOptions } from 'server/helpers/auth';

export default NextAuth(nextAuthOptions);
