// Simplest webpack configuration to bundle/glue all the js code
const webpack = require('webpack');
const path = require('path');

const libraryName = 'abstractorm';
const outputFile = `${libraryName}.js`;

const env = process.env.NODE_ENV || 'development';

const config = {
  entry: __dirname + '/test/*.test.js',
  devtool: 'source-map',
  target: "electron-renderer",
  mode: env,
  output: {
    path: __dirname + '/tmp',
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  }
};

module.exports = config;