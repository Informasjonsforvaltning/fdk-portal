import { merge } from 'webpack-merge';

import baseConfig from './base.config';

export default merge(baseConfig, {
  mode: 'production',
  devtool: 'none',
  output: {
    filename: '[name].[contenthash].js'
  },
  optimization: {
    moduleIds: 'hashed',
    splitChunks: {
      maxSize: 40000,
      cacheGroups: {
        mainVendors: {
          test: ({ resource = '' }) => resource.includes('node_modules'),
          name: module =>
            `main.vendor.${module.context
              .match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
              .replace('@', '')}`,
          chunks: ({ name }) => name === 'main'
        },
        publishingVendors: {
          test: ({ resource = '' }) => resource.includes('node_modules'),
          name: module =>
            `publishing.vendor.${module.context
              .match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
              .replace('@', '')}`,
          chunks: ({ name }) => name === 'publishing'
        },
        maintenanceVendors: {
          test: ({ resource = '' }) => resource.includes('node_modules'),
          name: module =>
            `maintenance.vendor.${module.context
              .match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
              .replace('@', '')}`,
          chunks: ({ name }) => name === 'maintenance'
        }
      }
    }
  }
});
