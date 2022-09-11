import { ThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';
import { AppProps } from 'next/app';

import '../../public/assets/fonts/styles.css';
import { GlobalStyles } from '../styles/global-styles';
import { SessionProvider as NextAuthProvider } from 'next-auth/react';
import NextNProgress from 'nextjs-progressbar';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <ThemeProvider theme={theme}>
        <NextNProgress
          color={theme.colors.info}
          startPosition={0.3}
          stopDelayMs={200}
          height={10}
        />
        <Component {...pageProps} />
        <GlobalStyles />
      </ThemeProvider>
    </NextAuthProvider>
  );
}

export default MyApp;
