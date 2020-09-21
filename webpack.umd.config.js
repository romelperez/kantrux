const path = require('path');
const webpackCommonConfig = require('./webpack.common.config');

module.exports = {
  ...webpackCommonConfig,
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'kantrux.js',
    library: 'kantrux',
    libraryTarget: 'umd'
  }
};
