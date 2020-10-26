import React, { FC } from 'react';
import { hot } from 'react-hot-loader/root';
import { Provider as ReduxProvider } from 'react-redux';
import ThemeProvider from '@fellesdatakatalog/theme';

import TranslationsProvider from '../../../providers/translations';

import store from './redux/store';

import GlobalStyles from '../styles';
import Router from '../router';

import Analytics from '../../../components/analytics';

const App: FC = () => (
  <ThemeProvider>
    <GlobalStyles />
    <Analytics />
    <TranslationsProvider>
      <ReduxProvider store={store}>
        <Router />
      </ReduxProvider>
    </TranslationsProvider>
  </ThemeProvider>
);

export default hot(App);
