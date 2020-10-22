import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import App from './app';

function run(): void {
  render(
    <AppContainer>
      <App />
    </AppContainer>,
    document.getElementById('root')
  );
}

run();
