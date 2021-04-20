const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'client', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  mode: process.env.NODE_ENV,
  devServer: {
    publicPath: '/build/',
    proxy: {
      '/api': 'http://localhost:3000',
    },

    historyApiFallback: true,   // THIS IS KEY!!!

  },
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /.(css|scss)$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', "sass-loader"],
      },
    ],
  },
};

// const webpack = require('webpack');
// const path = require('path');
// //const HtmlWebpackPlugin = require('html-webpack-plugin');

// module.exports = {
//   entry: [
//         './client/index.js'
//       ],
//   output: {
//     path: path.resolve(__dirname, 'build'),
//     publicPath: '/',
//     filename: 'bundle.js',
//   },
//   // devtool: 'eval-source-map',
//   mode: process.env.NODE_ENV,
//   devServer: {
//     // host: '0.0.0.0',
//     // port: 8080,
//     // contentBase: path.resolve(__dirname, 'dist'),
//     // hot: true,
//     publicPath: '/',
//     // historyApiFallback: true,
//     // inline: true,
//     // headers: { 'Access-Control-Allow-Origin': '*' },
//     // proxy is required in order to make api calls to express server while using hot-reload webpack server
//     // routes api fetch requests from localhost:8080/api/* (webpack dev server) to localhost:3000/api/* (where our Express server is running)
//     proxy: {
//       '/api/**': {
//         target: 'http://localhost:3000/',
//         secure: false,
//       },
//     },
//   },
//   module: {
//     rules: [
//       {
//         test: /.(js|jsx)$/,
//         exclude: /node_modules/,
//         use: {
//           loader: 'babel-loader',
//           options: {
//             presets: ['@babel/preset-env', '@babel/preset-react']
//           }
//         },
//       },
//       {
//         test: /.(css|scss)$/,
//         exclude: /node_modules/,
//         use: ['style-loader', 'css-loader'],
//       },
//     ],
//   },
//   // plugins: [
//   //   new HtmlWebpackPlugin({
//   //     favicon: path.resolve(__dirname, './client/assets/images/mm.ico'),
//   //     template: './index.html'
//   //   })
//   // ]
// };
