import webpack from 'webpack';
import path from 'path';
//PLUGINS
import HtmlWebPackPlugin from 'html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { NodeServerPlugin }  from 'webpack-node-server-plugin';
//EXTERNALS
import nodeExternals from 'webpack-node-externals';

const modules = {
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: ['babel-loader']
    },
    {
      test: /\.scss$/,
      use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
    }
  ]
};

const client = {
  mode: "development",
  entry: {
    'client': './src/client/index.js'
  },
  target: 'web',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist/public')
  },
  module: modules,
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: 'src/client/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: "styles.css"
  }),
    new CleanWebpackPlugin('dist'),
    new webpack.HotModuleReplacementPlugin()
  ],
  watch: true
}
const server = {
    mode: "development",
    entry: {
        'server': './src/server/index.js'
    },
    target: 'node',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: modules,
    plugins: [
      new NodeServerPlugin()
    ],
    externals: [nodeExternals()]
}
module.exports = [client, server];