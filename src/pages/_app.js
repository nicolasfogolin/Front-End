import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { createEmotionCache } from '../utils/create-emotion-cache';
import { theme } from '../theme';
import { createStore } from 'redux';
import allReducers from 'src/reducers';
import { Provider } from 'react-redux';
import { RouteGuard } from 'src/components/router-guard';

import { AppWrapper } from "src/context/app-context";

const clientSideEmotionCache = createEmotionCache();

const store = createStore(
  allReducers,
  ((typeof window !== 'undefined')?window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__():f=>f)
);

const App = (props) => {

  const { Component, emotionCache = clientSideEmotionCache, pageProps, router } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <Provider store={store}>
      <AppWrapper>
      <CacheProvider value={emotionCache}>
        <Head>
          <title>
            Proyecto UTN React
          </title>
          <meta
            name="viewport"
            content="initial-scale=1, width=device-width"
          />
        </Head>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {getLayout(<RouteGuard><Component {...pageProps} /></RouteGuard>)}
          </ThemeProvider>
        </LocalizationProvider>
      </CacheProvider>
      </AppWrapper>
    </Provider>
  );
};

export default App;
