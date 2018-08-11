const webpack = require('webpack');
const path = require('path');

// variables
// const isProduction = process.argv.indexOf('-p') >= 0 || process.env.NODE_ENV === 'production';
const isProduction = process.argv.indexOf('-p') >= 0;
process.env.NODE_ENV = isProduction ? 'production' : 'development';
const sourcePath = path.join(__dirname, './src');
const outPath = path.join(__dirname, './dist');

// plugins
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


module.exports = {
  context: sourcePath,
  entry: {
    app: './index.tsx'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    chunkFilename: '[chunkhash].js',
    publicPath: ''
  },
  target: 'web',
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    // Fix webpack's default behavior to not load packages with jsnext:main module
    // (jsnext:main directs not usually distributable es6 format, but es6 sources)
    mainFields: ['module', 'browser', 'main'],
    alias: {
      app: path.resolve(__dirname, 'src/')
    }
  },
  module: {
    rules: [
      // .ts, .tsx
      {
        test: /\.ts(x?)$/,
        use: [
          isProduction && {
            loader: 'babel-loader',
            options: { plugins: ['react-hot-loader/babel'] }
          },
          'ts-loader'
        ].filter(Boolean)
      },
      // css
      {
        test: /\.css$/,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            query: {
              modules: true,
              sourceMap: !isProduction,
              importLoaders: 1,
              localIdentName: isProduction ? '[hash:base64:5]' : '[name]__[local]--[hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                require('postcss-import')({ addDependencyTo: webpack }),
                require('postcss-url')(),
                require('postcss-cssnext')(),
                require('postcss-reporter')(),
                require('postcss-browser-reporter')({
                  disabled: isProduction
                })
              ]
            }
          }
        ]
      },
      // static assets
      { test: /\.html$/, use: 'html-loader' },
      { test: /\.png$/, use: 'url-loader?limit=10000' },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              mimetype: 'image/svg+xml',
              name: 'images/[name].[ext]',
            }
          }
        ],
      },
      { test: /\.(jpg|gif)$/, use: 'file-loader' },
      {
        test: /\.less$/,
        use: [{
          loader: 'style-loader?sourceMap' // creates style nodes from JS strings
        }, {
          loader: 'css-loader', // translates CSS into CommonJS
        }, {
          loader: 'less-loader' // compiles Less to CSS
        }]
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      }
    ]
  },
  optimization: {
    splitChunks: {
      name: true,
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minChunks: 2
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          priority: -10
        }
      }
    },
    runtimeChunk: true
  },
  plugins: [
    new ProgressBarPlugin(),
    new CleanWebpackPlugin('dist/*'),
    new webpack.EnvironmentPlugin({
      NODE_ENV: process.env.NODE_ENV, // use 'development' unless process.env.NODE_ENV is defined
      DEBUG: !isProduction
    }),
    /*new MiniCssExtractPlugin({
      filename: '[contenthash].css',
      disable: !isProduction
    }),*/
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new BundleAnalyzerPlugin(),
    new CopyWebpackPlugin([
      {
        from: './images/',
        to: './images',
        force: true
      }
    ])
  ],
  devServer: {
    contentBase: sourcePath,
    hot: true,
    inline: true,
    /*historyApiFallback: {
      disableDotRule: true
    },
    stats: 'minimal'*/
  },
  node: {
    // workaround for webpack-dev-server issue
    // https://github.com/webpack/webpack-dev-server/issues/60#issuecomment-103411179
    fs: 'empty',
    net: 'empty'
  },
  devtool: !isProduction ? 'eval-cheap-module-source-map' : 'source-map',
};
