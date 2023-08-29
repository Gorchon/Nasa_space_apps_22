import { ChakraProvider } from '@chakra-ui/react';
import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';
import React from 'react';
import theme from 'theme/theme';

import 'styles/App.css';
import 'styles/Contact.css';
import 'styles/Fonts.css';
import 'styles/MiniCalendar.css';
import 'styles/Plugins.css';

import { Session } from 'next-auth';
import Head from 'next/head';
import { trpc } from 'utils/trpc';

interface MyAppProps extends AppProps {
  pageProps: {
    session: Session;
  };
}

function MyApp({ Component, pageProps }: MyAppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <ChakraProvider theme={theme}>
        <Head>
          <title>Horizon UI PRO TypeScript</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#000000" />
        </Head>
        <React.StrictMode>
          <Component {...pageProps} />
        </React.StrictMode>
      </ChakraProvider>
    </SessionProvider>
  );
}

export default trpc.withTRPC(MyApp);
