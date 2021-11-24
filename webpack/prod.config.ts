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
  optimization: {
    splitChunks: {
      maxSize: 40000,
      cacheGroups: {
        mainVendors: {
          test: ({ resource = '' }: any) => resource.includes('node_modules'),
          name: module =>
            `main.vendor.${module.context
              .match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
              .replace('@', '')}`,
          chunks: ({ name }) => name === 'main'
        },
        publishingVendors: {
          test: ({ resource = '' }: any) => resource.includes('node_modules'),
          name: module =>
            `publishing.vendor.${module.context
              .match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
              .replace('@', '')}`,
          chunks: ({ name }) => name === 'publishing'
        },
        maintenanceVendors: {
          test: ({ resource = '' }: any) => resource.includes('node_modules'),
          name: module =>
            `maintenance.vendor.${module.context
              .match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
              .replace('@', '')}`,
          chunks: ({ name }) => name === 'maintenance'
        }
      }
    }
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
