const webpack = require('webpack');
const ESLintPlugin = require('eslint-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { merge } = require('webpack-merge');
const { resolve, getCssLoaders, getEntries } = require('./utils');
const baseConfig = require('./webpack.base.conf');

const { entries, htmlPlugins } = getEntries();

const devConfig = merge(baseConfig, {
  experiments: {
    lazyCompilation: true,
  },
  entry: {
    ...entries,
  },
  devServer: {
    port: 2345,
    hot: true,
    host: '0.0.0.0',
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
    static: [resolve('demos/public')],
    historyApiFallback: {
      disableDotRule: true,
    },
    proxy: {
      '/api': {
        target: 'http://10.0.70.51:8000',
        changeOrigin: true,
        // pathRewrite: {
        //   '^/xxx': '/',
        // },
      },
    },
  },
  module: {
    rules: getCssLoaders(),
  },
  plugins: [new webpack.HotModuleReplacementPlugin(), new ReactRefreshWebpackPlugin(), new ESLintPlugin(), ...htmlPlugins],
});

module.exports = devConfig;
