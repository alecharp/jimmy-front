const path = require('path');
const merge = require('webpack-merge');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const common = {
  entry: {
    index: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]-[hash].js',
  },
  module: {
    rules: [
      { test: /\.vue$/, exclude: /node_modules/, use: 'vue-loader' },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['babel-preset-env'],
              plugins: [
                require('babel-plugin-syntax-dynamic-import'),
                require('babel-plugin-transform-object-rest-spread'),
              ]
            }
          }
        ],
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ],
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', '.scss'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new VueLoaderPlugin()
  ],
};

const development = {
  mode: 'development',
  devtool: 'eval',
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    port: '4000',
    proxy: {
      '/api': 'http://localhost:8181'
    }
  }
};

const production = {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /node_modules/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
};

module.exports = env => {
  switch (env) {
    case 'production': return merge(common, production)
    default: return merge(common, development)
  }
};
