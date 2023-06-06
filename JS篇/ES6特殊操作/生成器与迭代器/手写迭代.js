// let SimpleClass = {
//     data: [1, 2, 3, 4, 5],
//     [Symbol.iterator]() {
//         let index = 0;
//         return {
//             next: () => {
//                 if (index < this.data.length) {
//                     return { value: this.data[index++], done: false }
//                 } else {
//                     return { done: true }
//                 }
//             }
//         }
//     }
// }
// for (const key in object) {
//     if (Object.hasOwnProperty.call(object, key)) {
//         const element = object[key];

//     }
// }

// for (const iterator of object) {

// }
const o = { 0: 1, 1: 2, 2: 3, length: 3 };
// 解决Object对象不能使用for...of...迭代的问题
// 手写迭代器
// for (const i of o) {
//     console.log(i);
// }
Object.prototype.test = "test"
console.log((new Object).__proto__);
console.log(Object.prototype.isPrototypeOf(constructor));
console.log(Object.prototype.isPrototypeOf(test));

Object.prototype[Symbol.iterator] = iterator;

function iterator () {
  var index = 0;
  var _this = this;
  return {
    next () {
      return index < _this.length ? { value: this[index++], done: false } : { value: undefined, done: true }
    }
  }
}
// let obj = { name: 11, age: 22, hobby: 33 };
// for (let val of obj) {
//     console.log(val);
// }


const obj = { a: 1, b: 2, c: 3 }
// 启用 Generator 的方式进行对象迭代
function* entries (obj) {
  for (let key of Object.keys(obj)) {
    yield [key, obj[key]];
  }
}

for (let [key, value] of entries(obj)) {
  console.log(key, '->', value);
}
