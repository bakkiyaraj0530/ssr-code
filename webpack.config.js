const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const autoprefixer = require("autoprefixer")
const path = require('path')
const devMode = process.env.NODE_ENV !== 'production'

const commonloader = {
  test: /\.js$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['react', 'es2015'],
      plugins: ['transform-class-properties']
    }
  }
};
const js = [
  commonloader,
  {
    test: [/\.svg$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
    loader: "file-loader",
    options: {
      name: "dist/public/media/[name].[ext]",
      publicPath: url => url.replace(/\dist\/public/, "")
      // path: path.resolve(__dirname, 'dist/public'),

    }
  },
  {
    test: /\.css$/,
    use: [
      // {
      //   loader: MiniCssExtractPlugin.loader,
      //   options: { importLoaders: 1, plugins: [autoprefixer()] }
      // },
      "css-loader",
      "style-loader",
      "postcss-loader",
    ],
  }
];


const serverConfig = {
  mode: 'development',
  target: 'node',
  node: {
    __dirname: false
  },
  externals: [nodeExternals()],
  entry: {
    'index.js': path.resolve(__dirname, 'src/index.js')
  },
  module: {
    rules: [commonloader]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]'
  }
}

const clientConfig = {
  mode: 'development',
  resolve: {
    extensions: [".jsx", ".css", ".js", ".json"]
  },
  target: 'node',
  entry: {
    'home.js': path.resolve(__dirname, 'src/public/home.js'),
    'multipleRoutes.js': path.resolve(__dirname, 'src/public/multipleRoutes.js')
  },
  module: {
    rules: [
      {
        test: [/\.svg$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: "file-loader",
        options: {
          name: "dist/public/media/[name].[ext]",
          publicPath: url => url.replace(/\dist\/public/, "")
        }
      },
      { test: /\.css$/, exclude: /node_modules/,
        use: [
             'style-loader',
             {
               loader: 'css-loader',
               options: {
                 modules: true,
               },
             },
           ],
          },
          // loaders: ['style-loader', 'css-loader'],
        //  },

      // {
      //   test: /\.css$/,
      //   use: [
      //     {
      //       loader: MiniCssExtractPlugin.loader,
      //       options: {
      //         // you can specify a publicPath here
      //         // by default it use publicPath in webpackOptions.output
      //         publicPath: '../'
      //       }
      //     },
      //     "css-loader"
      //   ],
      //   // use: ExtractTextPlugin.extract({
      //   //   use: [
      //   //     {
      //   //       loader: "css-loader",
      //   //       options: { importLoaders: 1 }
      //   //     },
      //   //     {
      //   //       loader: "postcss-loader",
      //   //       options: { plugins: [autoprefixer()] }
      //   //     }
      //   //   ]
      //   // })
      // },
      {
        test: /js$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        // query: { presets: ["react-app"] }
        options: {
          presets: ['react', 'es2015'],
          plugins: ['transform-class-properties']
        }
      }
    ]
  },
  plugins: [

    new MiniCssExtractPlugin(),


    // new MiniCssExtractPlugin({
    //   filename: "dist/public/css/[name].css"
    // }),
    // new webpack.BannerPlugin({
    //   banner: "__isBrowser__ = true;",
    //   raw: true,
    //   include: /\.js$/
    // })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  output: {
    path: path.resolve(__dirname, 'dist/public'),
    filename: '[name]'
  }
}

module.exports = [serverConfig, clientConfig]
