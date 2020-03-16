const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development', // 실서비스: production
  devtool: 'eval', // 실서비스: hidden-source-map

  // resolve 써주면 entry에 입력 file 추가 시 확장자 안써도됨
  resolve: {
    extensions: ['.js', '.jsx'],
  },

  // input ex) client.jsx, WordRelay.jsx
  entry: {
    app: ['./client'],
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                targets: {
                  browsers: ['> 5% in KR'],
                },
              },
            ],
            '@babel/preset-react',
          ], // plugin들의 모음 = presets, presets 각각의 세부 옵션을 정해줄수있음
          plugins: ['@babel/plugin-proposal-class-properties', 'react-hot-loader/babel'],
        },
      },
    ],
  },

  //
  plugins: [new webpack.LoaderOptionsPlugin({ debug: true })],

  // output ex) app.js
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js',
    publicPath: '/dist',
  },
};
