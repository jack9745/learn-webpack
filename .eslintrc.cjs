// 遇到的问题
// 1 Parsing error: The keyword ‘const‘ is reserved eslint

module.exports = {
  // 配置全局变量
  globals: {
    module: true,
  },
  env: {
    node: true,
  },
  root: true,
  extends: ['eslint:recommended'],
  parserOptions: {
    // 如果要使用模块系统，必须要有下面这样的配置
    ecmaVersion: 6,
    // 没有这行配置，将不能使用 import 和export 语法
    sourceType: 'module',
    // parser: 'babel-eslint',
  },
}
