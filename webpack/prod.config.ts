import { merge } from 'webpack-merge';
import type { Configuration } from 'webpack';

import baseConfig from './base.config';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const deps = require('../package.json').dependencies;

delete deps['highlight.js'];

const configuration: Configuration = merge(baseConfig, {
  mode: 'production',
  target: ['web', 'es5'],
  output: {
    filename: '[name].[contenthash].js'
  },
  plugins: []
});

export default configuration;
