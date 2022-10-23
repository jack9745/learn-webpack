// 以下配置都是基于webpack5  important!!!!

const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')

/**
 * 如何自动编译？？ 有几种方法 ？？
 * 问题：每次改动文件，然后手动输入命令编译很是麻烦，
 * 如何让webpack在我们改动文件之后自动编译呢？？
 *
 * 解决办法：
 * 1.自动监听文件，使用观察模式  在package.json文件中的script中添加
 *  "watch": "webpack --watch",这种模式下，如果一个文件被更新，代码将被重新编译
 *  这种方法有一个缺点就是 为了看到修改后的实际效果，你需要刷新浏览器
 *
 * 2 webpack-dev-server 在本地提供了一个web server 并且具有实时重新加载的功能living reloading
 * 配置好了之后 可以运行脚本命令
 *   "start": "webpack serve --open" 和以前的配置都不一样了
 */

/**
 * 学习如何代码分离
 * 代码分离是 webpack 中最引人注目的特性之一。
 * 此特性能够把代码分离到不同的 bundle 中，
 * 然后可以按需加载或并行加载这些文件。
 *
 *  * 有哪些方式可以配置代码分离
 * 1.入口起点：使用 entry 配置手动地分离代码。这种方式需要手动配置的地方较多
 */

/**
 * 到目前为止，我们都是在index.html中手动引入资源，那么当我们的应用增长，
 * 并且我们的文件名中使用hash，并且输出多个bundle，
 * 那么手动管理index.html就会变得困难起来
 *
 * 所以要学习管理输出，让index.html文件自动管理需要引入的内容
 * */
/**
 * 什么是bundle??
 * 分发代码是指在构建过程中，经过最小化和优化后产生的输出结果，
 * 最终将在浏览器中加载。
 *
 *
 * 在安装一个 package，而此 package 要打包到生产环境 bundle 中时，
 * 你应该使用 npm install --save。如果你在安装一个用于开发环境的 package 时（例如，linter, 测试库等），
 * 你应该使用 npm install --save-dev。更多信息请查看 npm 文档。
 */
module.exports = {
  // 学习开发环境配置
  // 我们先将 mode 设置为 'development'，
  mode: 'development',

  /**
   * 为了更容易地追踪 error 和 warning，
   * JavaScript 提供了 source maps 功能，
   * 可以将编译后的代码映射回原始源代码。如果一个错误来自于 b.js，
   * source map 就会明确的告诉你。
   * */
  // 如果没有下面这行代码，不会映射回源代码
  devtool: 'inline-source-map',

  //
  devServer: {
    // 这个配置是啥意思 ？
    /**
     * 下面的配置是告诉webpack-dev-server，将dist目录下的文件serve到localhost:8080下面
     * serve，将资源作为 server 的可访问文件*/
    static: './dist',
  },
  optimization: {
    runtimeChunk: 'single',
    /**
     * 经过下面的配置，我们看到重新编译之后，
     * 多了一个bundle文件 , vendors-node_modules_lodash_lodash_js.bundle.js
     * 然后主入口的生成的两个bundle文件的体积减小了
     **/
    splitChunks: {
      chunks: 'all',
    },
  },
  // entry: './src/index.js',
  /**
   * 经过这样的配置之后，我们可以看到 webpack生成了两个文件
   * 一个是 index.bundle.js和一个 print.bundle.js文件
   * 和我们在index.html文件中手动指定的文件名称是一样的 ，这样是有问题的？
   *
   * 引出的问题是：但是，如果我们更改了我们的一个入口起点的名称，
   * 甚至添加了一个新的入口，会发生什么？会在构建时重新命名生成的 bundle，
   * 但是我们的 index.html 文件仍然引用旧的名称。
   */
  entry: {
    /**
     *  * 有哪些方式可以配置代码分离
     * 1.入口起点：使用 entry 配置手动地分离代码。这种方式需要手动配置的地方较多
     * 正如上面所说的，如果入口chunk中包含一些重复的模块，
     * 那么重复的模块都会被引入到各个bundle中，比如打包出来的两个包中都有lodash包的代码
     * 官网上还是说这种方式不能将核心应用程序逻辑中的代码拆分出来
     *
     * 那么怎么解决上面的问题？
     * 配置共享模块 参考下面的配置
     *
     *
     * 2.可以使用插件 SplitChunksPlugin
     * SplitChunksPlugin 插件可以将公共的依赖模块提取到已有的入口chunk 中,
     * 或者提取到一个新生成的chunk中，
     *
     *
     *
     *
     * */
    index: './src/index.js',
    another: './src/another-module.js',

    // 配置dependOn 改成这种配置方式 这样可以在多个chunk之间共享模块
    /**
     * 经过这样的配置之后，打包之后的文件多了一个shared.bundle.js，里面的内容就是lodash
     * 然后两个bundle文件的体积减小了
     * */
    // index: {
    //   import: './src/index.js',
    //   dependOn: 'shared',
    // },
    // another: {
    //   import: './src/another-module.js',
    //   dependOn: 'shared',
    // },
    // shared: 'lodash',
    // 当我们改动了入口起点的文件名称，
    //  HtmlWebpackPlugin插件会自动更新bundle文件名称
    // printTest: './src/print.js',
  },

  // 怎么样清理/dist 文件夹
  /**
   *
   * webpack 将生成文件并放置在 /dist 文件夹中，
   * 但是它不会追踪哪些文件是实际在项目中用到的。
   *
   * 通常比较推荐的做法是，在每次构建前清理 /dist 文件夹，这样只会生成用到的文件。
   */
  output: {
    // filename: 'main.js',
    // filename: 'bundle.js',
    // 可以看到打包出来的文件的体积挺大的
    /**
     * 
     *  asset index.bundle.js 1.9 MiB [emitted] (name: index)
      asset another.bundle.js 1.84 MiB [emitted] (name: another)
      */
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    // 每次构建之前都清理 dist文件夹
    clean: true,
    // 这里配置是为了测试 webpack-dev-middleware
    publicPath: '/',
  },

  plugins: [
    /**
     *HtmlWebpackPlugin插件的作用是什么？？

     * 在我们构建之前，你应该了解，虽然在 dist/ 文件夹我们已经有了 index.html
     * 然而 HtmlWebpackPlugin 还是会默认生成它自己的 index.html 文件。
     * 也就是说，它会用新生成的 index.html 文件，替换我们的原有文件。
     *
     * */

    /**
     * 我们可以看到打包之后的index.html文件中，所有的bundle都已经添加到index.html文件中*/
    new HtmlWebpackPlugin({
      title: '我是管理输出的标题',
    }),
  ],
  // 学习如何配置css-loader
  /**
   * 为了在 JavaScript 模块中 import 一个 CSS 文件，
   * 你需要安装 style-loader 和 css-loader，
   * 并在 module 配置 中添加这些 loader：
   */

  module: {
    /**
     * 模块 loader 可以链式调用。
     * 链中的每个 loader 都将对资源进行转换。链会逆序执行。
     * 。第一个 loader 将其结果（被转换后的资源）传递给下一个 loader
     *
     * webpack 内部会先调用css-loader 然后再在将转换后的资源传给 style-loader
     * */
    rules: [
      /**
       * webpack 最出色的功能之一就是，除了引入 JavaScript，
       * 还可以通过 loader 或内置的 Asset Modules 引入任何其他类型的文件。
       */

      /**
       * 经过下面的配置之后，我们可以在js 中引入 css 文件了
       * 比如  import './style.css'
       *
       * 现在，在此模块执行过程中，含有 CSS 字符串的 <style> 标签，
       * 将被插入到 html 文件的 <head> 中。
       * 我的理解应该是style-loader的功能
       *
       */
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },

      // 验证一下less文件 webpack是怎么处理的
      /**
       * 遇到的问题，当只安装 less-loader是不够的，当编译打包的时候会报错的
       * 错误是 Cannot find module 'less' 上网查了一下还要安装less module
       * 安装了之后 重新打包成功了，坑真是多呀，
       * 在 index.js中引入 style.less文件是可以被正常编译的，
       * 可以看到编译之后的结果，在index.html 文件的head标签中又多了一个style标签
       * 里面的内容是我们在style.less中编写的文件
       */
      {
        test: /\.less$/i,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },

      // 解析图像文件
      /**
       * webpack5 中好像不用配置也可以自动解析 图片格式的文件
       *
       */
      {
        test: /\.(png|jpg|jpeg|gif$)/i,
        type: 'asset/resource',
      },
    ],
  },
}
