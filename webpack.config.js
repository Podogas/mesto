const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: { main: './src/pages/index.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
    // добавили правило для обработки файлов
    {
      // images
      test: /\.(svg|otf|gif|jpg|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      // при обработке этих файлов нужно использовать file-loader
      loader: 'file-loader?name=./images/[name].[ext]'
    },
    {
          //fonts
      test: /\.(ttf|eot|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      // при обработке этих файлов нужно использовать file-loader
      loader: 'file-loader?name=./vendor/[name].[ext]',
    },

    // аналогично добавьте правило для работы с html
    {
      test: /\.html$/,
      loader: 'html-loader',
    },
    {
    // применять это правило только к CSS-файлам
      test: /\.css$/,
    // при обработке этих файлов нужно использовать
    // MiniCssExtractPlugin.loader и css-loader
      loader:  [MiniCssExtractPlugin.loader,
      { loader: 'css-loader', options: { importLoaders: 1 } },
      'postcss-loader',
      ]
  }
    ]
  },
  plugins: [
    // настроили плагин
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin()
  ]
};