/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');

module.exports = {
  context: __dirname,

  entry: {
    app: './src',
  },

  output: {
    filename: '[name]-[hash].js',
  },

  plugins: [],

  module: {
    rules: [
      {
        test: /\.js$|\.jsx$/,
        use: 'babel-loader',
        include: [],
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx'],
    mainFields: ['module', 'main'],
  },
};
