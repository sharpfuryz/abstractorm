// Simplest webpack configuration to bundle/glue all the js code
const webpack = require('webpack');
const path = require('path');

const libraryName = 'abstractorm';
const outputFile = `${libraryName}.js`;

const env = process.env.NODE_ENV || 'production';

const config = {
  entry: __dirname + '/src/index.js',
  devtool: 'source-map',
  target: "electron-renderer",
  mode: env,
  output: {
    path: __dirname + '/dist',
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  }
};

module.exports = config;