import React, { useEffect, useState } from 'react';
import { AppProps } from 'next/app';
import { AppStateProvider } from 'app-state';
import NextProgress from 'next-progress';
import { appWithTranslation } from 'next-i18next';
import { applyTheme } from 'themes/utils/theme';
import { PageLayout } from '../components/layout';
import '../styles/globals.css';

function App({ Component, pageProps }: AppProps) {
  // Set theme to 'base' or 'highcontrast'
  const [theme] = useState('base');
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  return (
    <AppStateProvider>
      <PageLayout>
        <NextProgress delay={150} height={2} color="var(--color-primary)" options={{ showSpinner: false }} />
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </PageLayout>
    </AppStateProvider>
  );
}

export default appWithTranslation(App);
