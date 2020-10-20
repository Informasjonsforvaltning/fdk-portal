import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import ThemeProvider from '@fellesdatakatalog/theme';

import { configureStore } from '../../redux/configureStore';
import { ConnectedApp } from '../../app/connected-app';
import { ErrorBoundary } from '../../components/error-boundary/error-boundary';
import { getConfig } from '../../config';
import { themeFDK, themeNAP } from '../../app/theme';
import GlobalStyles from '../../app/styles';

import Analytics from '../../components/analytics';

const store = configureStore(getConfig().store);
const theme = getConfig().themeNap ? themeNAP : themeFDK;

render(
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <Analytics />
    <ErrorBoundary>
      <Provider store={store}>
        <BrowserRouter>
          <Route component={ConnectedApp} />
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  </ThemeProvider>,
  document.getElementById('root')
);
