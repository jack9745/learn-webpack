/**
 * webpack-dev-middleware 是一个封装器(wrapper)，
 * 它可以把 webpack 处理过的文件发送到一个 server。
 *
 * */

// 这种方式好像不能自动实时刷新页面
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const express = require('express')
const app = express()
const config = require('./webpack.config')
// console.log(config)

const compiler = webpack(config)

// console.log('compiler11-------------\n', compiler)

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  })
)

app.listen(3000, function () {
  console.log('app is listen at port 3000')
})
