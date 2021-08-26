import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import App from './app';

import LoggingProvider from '../../providers/logging';

function run(): void {
  render(
    <LoggingProvider>
      <AppContainer>
        <App />
      </AppContainer>
    </LoggingProvider>,
    document.getElementById('root')
  );
}

run();
