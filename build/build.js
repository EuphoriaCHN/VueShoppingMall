'use strict';
require('./check-versions')(); // 调用检查版本方法，同目录下的 check-versions.js

process.env.NODE_ENV = 'production'; // 全局环境的设置，设置版本为开发版本或生产版本
// 因为 build.js 打的是生产包，所以这里是 production

const ora = require('ora'); // 终端中在安装包时旋转的小点点就是这个做的
const rm = require('rimraf'); // Node.js 中的 rm -rf
const path = require('path');
const chalk = require('chalk'); // 对日志输出彩色文案提供 API
const webpack = require('webpack');
const config = require('../config'); // 根据导包规范，会去寻找这个文件夹下的 index.js
const webpackConfig = require('./webpack.prod.conf'); // webpack 生产包配置
// webpack 基础配置都在 webpack.base.conf.js 中写了，这个 webpack.prod.conf 是对其打生产包的一个补充

const spinner = ora('building for production...');
spinner.start();

// 在打包之前，要把前一次打包的文件先删除掉
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err;
  // webpack 有两种打包方式，第一个就是通过命令行去打包（前提是全局安装了 webpack）
  // 第二种方式就像这样，用提供的 API 去打包
  webpack(webpackConfig, (err, stats) => {
    // 这个 webpackConfig 就是 webpack.prod.conf.js 种导出的模块
    spinner.stop();
    if (err) throw err;
    // 设置输出的颜色和模式
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,
      chunkModules: false
    }) + '\n\n');

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'));
      process.exit(1);
    }

    console.log(chalk.cyan('  Build complete.\n'));
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ));
  });
});
