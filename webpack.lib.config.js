/**
 * 学习如何打包一个源码工程，然后生成一个库
 */

const path = require('path')

module.exports = {
  entry: './src/test.js',
  output: {
    filename: 'webpack-numbers.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    /**
     * 这里是不同的部分 - 我们需要通过 output.library
     * 配置项暴露从入口导出的内容。 */

    /**
     * 我们将入口起点公开为 webpackNumbers，
     * 这样用户就可以通过 script 标签使用它：
     * <script src="https://example.org/webpack-numbers.js"></script>
      <script>
        window.webpackNumbers.wordToNum('Five');
      </script>
     */
    // 通过下面的配置相当于是暴露了一个全局变量，然后可以在全局使用，
    // 这里的全局变量就是 webpackNumbers
    // library: 'webpackNumbers',

    // 通过这样的配置之后，通过webpack打包之后，其可以与 CommonJS、AMD 以及 script 标签使用。
    library: {
      name: 'webpackNumbers',
      type: 'umd',
    },
  },

  /**
   * 这个配置是起什么作用的？？
   * 首先看一个场景，查看打包之后的文件
   * 现在，如果执行 webpack，你会发现创建了一个体积相当大的文件。
   * 如果你查看这个文件，会看到 lodash 也被打包到代码中。
   * 。在这种场景中，我们更倾向于把 lodash 当作 peerDependency
   * 也就是说，consumer(使用者) 应该已经安装过 lodash
   * 因此，你就可以放弃控制此外部 library ，而是将控制权让给使用 library 的 consumer。
   *
   */
  // 通过这样的配置之后，我们可以看到 编译之后的webpack-numbers文件的大小之后只有1.22kb
  // 比之前没有如下配置的打包之后的文件 70kb小很多
  externals: {
    /**
     * 这意味着你的 library 需要一个名为 lodash 的依赖，
     * 这个依赖在 consumer 环境中必须存在且可用。*/
    lodash: {
      commonjs: 'lodash',
      commonjs2: 'lodash',
      amd: 'lodash',
      root: '_',
    },
  },
}
/**
 * package.json中字段的含义
 * main字段的含义：指向一个打包输出的主文件 通过这个文件，消费者可以导入这个文件导出的API
 * module字段的含义：module字段参照一个提案，此提案允许 JavaScript 生态系统升级使用 ES2015 模块，而不会破坏向后兼容性。
 * */

/**
 * 库工程项目 和宿主工程项目（引用这个包的项目）
 * 如何在宿主工程测试库工程的代码
 * 步骤：1.在库工程根目录下 运行命令 npm link，就会生成一个npm包，并且注册到全局
 * 在全局的node_modules目录下会出现当前包所在项目的快捷方式引用。
 * C:\Users\h1204\AppData\Roaming\npm\node_modules\learn-webpack -> D:\code\learn-webpack
 * 如上，生成的包的名字是 learn-webpack
 *
 * 2.然后在宿主项目的根目录下使用 npm link learn-webpack 命令关联，将包关联到宿主项目中
 * 就可以正常使用了
 *
 * 怎么解除npm包的引用
 * 在库工程中 使用npm unlink命令解除项目与全局的关联。
 * 在宿主工程中使用 npm unlink package-name命令解除项目与本地npm包的关联。
 *
 *
 * 在调试，优化库代码时，不用每次都npm link 只需要自定编译就可以了
 * */

// 写在后面，如果要发布生产，还有一些配置要做 可以参考配置
// https://webpack.docschina.org/guides/author-libraries/
