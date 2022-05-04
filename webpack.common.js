/* eslint-env node */
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const srcPath  = path.join(__dirname, 'src');
const destPath = path.join(__dirname, 'dist');

module.exports = {
  module: {
    rules: [
      {
        test: /\.css/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: true,
              sourceMap: true,
            },
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: true,
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              sassOptions: {
                // fiber: require('fibers'),
                fiber: false
              },
              sourceMap: true,
            },
          }
        ],
      },
      {
        test: /\.ts$/,
        use: 'ts-loader'
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.(svg|png|jpg|jpeg|gif)$/,
        type: 'asset/resource'
      },
    ]
  },
  entry: {
    main: path.join(srcPath, 'main.ts'),
  },
  output: {
    filename: '[name].bundle.js',
    path: destPath,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: path.join(srcPath, 'index.html'), to: path.join(destPath, 'index.html') },
        { from: path.join(srcPath, 'melon.png'), to: path.join(destPath, 'melon.png') },
      ],
    }),
  ],
  resolve: {
    extensions: ['.js', '.ts'],
    mainFields: ['module', 'main', 'browser'],
    fallback: {
      path: false,
      fs: false
    }
  },
  stats: {
    builtAt: true,
    errorsCount: true,
    warningsCount: true,
    timings: true,
  }
}