import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import ThemeProvider from '@fellesdatakatalog/theme';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import LoggingProvider from '../../providers/logging';

import { configureStore } from '../../redux/configureStore';
import { ConnectedApp } from '../../app/connected-app';
import { getConfig } from '../../config';
import { themeFDK, themeNAP } from '../../app/theme';
import GlobalStyles from '../../app/styles';

import Analytics from '../../components/analytics';

const client = new ApolloClient({
  uri: `${getConfig().cmsV2Api}/graphql`,
  cache: new InMemoryCache()
});

const store = configureStore(getConfig().store);
const theme = getConfig().themeNap ? themeNAP : themeFDK;

render(
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <LoggingProvider>
      <Analytics />
      <ApolloProvider client={client}>
        <Provider store={store}>
          <BrowserRouter>
            <Route component={ConnectedApp} />
          </BrowserRouter>
        </Provider>
      </ApolloProvider>
    </LoggingProvider>
  </ThemeProvider>,
  document.getElementById('root')
);
