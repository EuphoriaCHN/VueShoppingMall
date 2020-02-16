'use strict';
const path = require('path');
const utils = require('./utils'); // 公共配置
const config = require('../config'); // 开发配置
const vueLoaderConfig = require('./vue-loader.conf'); // vue loader 配置

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}



module.exports = {
  context: path.resolve(__dirname, '../'),
  // 同 webpack.config.js 写法，entry 就是项目入口文件
  entry: {
    app: './src/main.js' // 最后被加到底下的就叫 app.js，也可以设置为其他名称
  },
  // 输出配置
  output: {
    path: config.build.assetsRoot, // 默认是 path.resolve(__dirname, '../dist')
    filename: '[name].js', // 中括号代表这是一个变量，和 url-loader 参数种的中括号一样
    // entry 里面的名字叫 app，那么这个输出的名字就叫 app.js
    publicPath: process.env.NODE_ENV === 'production' // 静态资源的根引用路径
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js', // ES 模块的 JS 文件
      '@': resolve('src'), // @ 的别名就是来自这里
    }
  },
  module: {
    // 自定义规则
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader', // 犹大官方提供
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000, // 10k 以下的图片会以 base64 格式打包
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000, // 10k 以下的字体文件就会被哈希
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
