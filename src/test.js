// 这个是主文件
import _ from 'lodash'
import numRef from './ref.json'

export function numToWord(num) {
  return _.reduce(
    numRef,
    (accum, ref) => {
      return ref.num === num ? ref.word : accum
    },
    ''
  )
}

export function wordToNum(word) {
  return _.reduce(
    numRef,
    (accum, ref) => {
      return ref.word === word && word.toLowerCase() ? ref.num : accum
    },
    -1
  )
}

export default function add(a, b) {
  return a + b
}

export function filterListByNameField(name, list = []) {
  return list.filter((item) => {
    return item.name === name
  })
}
