// 生成器 -> 生成一个迭代器
function* generator (arr) {
  for (let val of arr) {
    yield val;
  }
}
// const arr = [11, 22, 33, 44];
// const iterator = generator(arr);
// console.log(iterator.next().value);
// console.log(iterator.next().value);
// console.log(iterator.next().value);
// console.log(iterator.next().value);
// console.log(iterator.next().value);


// function test() {
//     'use strict'
//     // let str = "hello";
//     let strObj = new String('hello');
//     // str.name = "world";
//     strObj[6] = "world";

//     // console.log(str);
//     console.log(strObj);
//     for (const key of strObj) {
//         console.log(key);
//     }
// }

// test();

function* f () {
  for (var i = 0; true; i++) {
    var reset = yield i;
    if (reset) { i = -1; }
  }
}

var g = f();
console.log(g.next());
console.log(g.next());
console.log(g.next());
// g.next() // { value: 0, done: false }
// g.next() // { value: 1, done: false }
// g.next(true) // { value: 0, done: false }
