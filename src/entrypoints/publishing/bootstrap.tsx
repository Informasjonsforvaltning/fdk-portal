import 'core-js-pure/stable';
import 'regenerator-runtime/runtime';

import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import App from './app';
import { getConfig } from '../../config';

import LoggingProvider from '../../providers/logging';

const client = new ApolloClient({
  uri: `${getConfig().cmsV2Api.host}/graphql`,
  cache: new InMemoryCache()
});

function run(): void {
  render(
    <LoggingProvider>
      <ApolloProvider client={client}>
        <AppContainer>
          <App />
        </AppContainer>
      </ApolloProvider>
    </LoggingProvider>,
    document.getElementById('root')
  );
}

run();
