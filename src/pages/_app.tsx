import { MantineProvider, createTheme } from '@mantine/core';
import React from 'react';
import '../styles/globals.scss';

import { Layout } from '../components/layout/Layout';
import { Provider } from 'react-redux';
import store from '../redux/store';

const theme = createTheme({
  /** Put your mantine theme override here */
});

export default function App({ Component, pageProps }: any) {
  return (
    <MantineProvider theme={theme}>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </MantineProvider>
  );
}
