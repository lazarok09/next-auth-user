import { ThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';
import { AppProps } from 'next/app';

import '../../public/assets/fonts/styles.css';
import { GlobalStyles } from '../styles/global-styles';
import { SessionProvider as NextAuthProvider } from 'next-auth/react';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
        <GlobalStyles />
      </ThemeProvider>
    </NextAuthProvider>
  );
}

export default MyApp;
