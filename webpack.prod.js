const path                 = require('path');
const HtmlWebpackPlugin    = require('html-webpack-plugin');
const CleanWebpackPlugin   = require('clean-webpack-plugin');
const webpack              = require('webpack');
const ExtractTextPlugin    = require('extract-text-webpack-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const fs = require('fs');

const pages = require('./config/pages');

const plugins = [
  new webpack.ProvidePlugin({$: 'jquery', jQuery: 'jquery' }),
  new BundleAnalyzerPlugin({analyzerMode: 'static', openAnalyzer: false}),
  new ExtractTextPlugin('styles.css'),
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false,
  }),
  new CleanWebpackPlugin(['dist']),
  new CopyWebpackPlugin([
    { from: 'img', to: 'img' },
  ]),
];


pages.forEach((page)=>{
  page.content = fs.readFileSync(`src/pages/${page.filename}.html`, {encoding: 'utf8'});
});

pages.forEach((page)=>{
  const addPlugin = new HtmlWebpackPlugin({
    template: './src/index.ejs',
    inject: true,
    hash: true,
    cache: false,
    filename: `${page.filename}.html`,
    title: page.name,
    content: page.content,
  });
  plugins.push(addPlugin);
});

module.exports = {
  entry: './src/js/index.js',
  devtool: 'source-map',
  cache: true,
  plugins,
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  node: {
    tls: 'empty',
    fs: 'empty',
    net: 'empty',
    console: true,
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['env'],
        },
      },
    },
    {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader',
      }),
    },
    {
      test: /\.(png|svg|jpg|gif)$/,
      use: [
        'file-loader',
      ],
    },
    {
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: [
        'file-loader',
      ],
    },
    ],
  },
};
