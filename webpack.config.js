const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

// const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin');
// const FileManagerPlugin = require('filemanager-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';
const stylesHandler = isProduction ? MiniCssExtractPlugin.loader : 'style-loader';

const jsLoaders = () => {
  const loaders = [{
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-env'],
    },
  }];

  return loaders;
};

const config = {
  entry: {
    index: path.resolve(__dirname, './src/index.js'),
  },
  output: {
    filename: './js/[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    minimizer: [
      "...",
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              ["gifsicle", {
                interlaced: true
              }],
              ["jpegtran", {
                progressive: true
              }],
              ["optipng", {
                optimizationLevel: 5
              }],
              [
                "svgo",
                {
                  plugins: [{
                    name: "preset-default",
                    params: {
                      overrides: {
                        removeViewBox: false,
                        addAttributesToSVGElement: {
                          params: {
                            attributes: [{
                              xmlns: "http://www.w3.org/2000/svg"
                            }, ],
                          },
                        },
                      },
                    },
                  }, ],
                },
              ],
            ],
          },
        },
      }),
    ],
  },
  devtool: 'source-map',
  devServer: {
    open: true,
    host: 'localhost',
    static: './dist',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      chunks: ['index'],
      minify: {
        collapseWhitespace: isProduction,
      },
    }),
    new MiniCssExtractPlugin({
      filename: './css/[contenthash].css',
    }),
    // new ImageminWebpWebpackPlugin({
    //   config: [{
    //     test: /\.(jpe?g|png)/,
    //     options: {
    //       quality: 85
    //     }
    //   }],
    //   overrideExtension: true,
    //   strict: true
    // }),
    // new FileManagerPlugin({
    //   events: {
    //     onEnd: {
    //       copy: [{
    //         source: './dist/assets/images/*.webp',
    //         destination: './src/assets/images/webp/',
    //       }, ],
    //     },
    //   },
    // }),
  ],
  performance: {
    maxAssetSize: 1000000,
  },
  module: {
    rules: [{
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.m?js$/i,
        exclude: /node_modules/,
        use: jsLoaders(),
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [stylesHandler,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                    {

                    },
                  ],
                ],
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|svg|gif|webp)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name][ext]',
        },
      },
      {
        test: /\.(ttf|woff2|woff|eot)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name][ext]',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      assets: path.resolve(__dirname, './src/assets'),
      fonts: path.resolve(__dirname, './src/assets/fonts'),
      images: path.resolve(__dirname, './src/assets/images'),
    },
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = 'production';
  } else {
    config.mode = 'development';
  }
  return config;
};
