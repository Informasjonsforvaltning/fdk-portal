import { merge } from 'webpack-merge';
import type { Configuration } from 'webpack';
import ModuleFederationPlugin from 'webpack/lib/container/ModuleFederationPlugin';

import baseConfig from './base.config';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const deps = require('../package.json').dependencies;

const configuration: Configuration = merge(baseConfig, {
  mode: 'production',
  target: ['web', 'es5'],
  output: {
    filename: '[name].[contenthash].js'
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'portal',
      remotes: {
        sparql_gui:
          process.env.NAMESPACE === 'production'
            ? 'sparql_gui@https://sparql.fellesdatakatalog.digdir.no/sparql/remoteEntry.js'
            : 'sparql_gui@https://sparql.staging.fellesdatakatalog.digdir.no/sparql/remoteEntry.js'
      },
      shared: {
        ...deps,
        react: { singleton: true, requiredVersion: deps.react },
        'react-dom': { singleton: true, requiredVersion: deps.react }
      }
    })
  ]
});

export default configuration;
