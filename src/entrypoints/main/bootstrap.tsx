import 'core-js-pure/stable';
import 'regenerator-runtime/runtime';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import ThemeProvider from '@fellesdatakatalog/theme';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import LoggingProvider from '../../providers/logging';
import AuthProvider from '../../providers/auth';

import { ConnectedApp } from '../../app/connected-app';
import { getConfig } from '../../config';
import { themeFDK, themeNAP } from '../../app/theme';
import GlobalStyles from '../../app/styles';

import AnalyticsGA from '../../components/analytics-ga';
import AnalyticsSiteImprove from '../../components/analytics-siteimprove';
import AnalyticsMonsido from '../../components/analytics-monsido';
import { store } from '../../redux/store';

const client = new ApolloClient({
  uri: `${getConfig().cmsV2Api.host}/graphql`,
  cache: new InMemoryCache()
});

const theme = getConfig().themeNap ? themeNAP : themeFDK;

render(
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <AuthProvider>
      <LoggingProvider>
        <AnalyticsGA />
        <AnalyticsSiteImprove />
        <AnalyticsMonsido />
        <ApolloProvider client={client}>
          <Provider store={store}>
            <BrowserRouter>
              <Route component={ConnectedApp} />
            </BrowserRouter>
          </Provider>
        </ApolloProvider>
      </LoggingProvider>
    </AuthProvider>
  </ThemeProvider>,
  document.getElementById('root')
);
