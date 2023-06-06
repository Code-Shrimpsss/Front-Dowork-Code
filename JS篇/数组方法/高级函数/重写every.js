Array.prototype.myEvery = function (cb) {
  let _arr = this
  let _len = _arr.length
  let _arg2 = argumnets[1] || window
  let _res = true

  for (let index = 0; index < _len; index++) {
    if (!cb.apply(_arg2, [_arr[index], index, _arr])) {
      _res = false
      break
    }
  }
  return _res
}

let arr = [
  { id: 1, name: 'zhangs', mobile: 110 },
  { id: 2, name: 'lisi', mobile: 110 },
  { id: 3, name: 'wanwu', mobile: 110 },
  { id: 3, name: 'wanwu', mobile: 120 },
]
let arr1 = [1, 2, 3]

const oldF = arr.every(function (item, index, arr) {
  return item.mobile == 110
}, arr1)

const newF = arr.every(function (item, index, arr) {
  return item.mobile == 110
}, arr1)

console.log(oldF)
console.log(newF)
