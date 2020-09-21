const path = require('path');
const webpackCommonConfig = require('./webpack.common.config');

module.exports = {
  ...webpackCommonConfig,
  entry: path.join(__dirname, 'e2e/common/src.js'),
  output: {
    path: path.join(__dirname, 'e2e/common'),
    filename: 'out.js'
  }
};
