import _ from 'lodash'
// 在js中引入css 文件
import './style.css'
import './style.less'

import print from './print'

// import './th.jpg'
// 这个文件中有引用字体文件
// import 'element-ui/lib/theme-chalk/index.css'
function component() {
  const element = document.createElement('div')
  const btn = document.createElement('button')
  btn.classList.add('btn')
  // element.innerHTML = _.join(['hello', 'webpack'], '')
  btn.innerHTML = 'Click me and check the console'
  btn.onclick = print
  // 运行html文件，可以看到有 style标签样式插入到 head标签中
  element.appendChild(btn)
  element.classList.add('hello')
  return element
}

document.body.appendChild(component())
