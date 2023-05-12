// // 关于 proxy
// const person = {
//   name: "张三",
//   age: 20,
//   brand: { group: { title: "宝马" } },
// };

// const p = new Proxy(person, {
//   get(target, property) {
//     console.log("拦击到了获取操作");
//     return target[property];
//   },
//   set(target, property, value) {
//     console.log("拦截到了设置或者新增操作");
//     target[property] = value;
//   },
//   deleteProperty(target, property) {
//     console.log("拦截到了删除操作");
//     return delete target[property];
//   },
// });

// console.log(p.name);
// p.name = "李四";
// delete p.name;
// p.sex = "男";

// console.log(p);
// console.log(person);

// console.log(p.age);

// // target, handly
// const ptest = new Proxy({}, {
//   get() {
//     console.log('get');
//   },

//   set() {
//     console.log('set');
//   }
// })

// console.log('-------------');

// ptest.t
// ptest.t = 11


var handler = {
  get: function (target, name) {
    if (name === 'prototype') {
      console.log(Object.prototype);
    }
    console.log('Hello, ' + name);
  },
  // 拦截proxy作为函数的调用
  apply: function (target, thisBinding, args) {
    return args[0];
  },
  construct: function (target, args) {
    return { value: args[1] };
  }
};
var fproxy = new Proxy(function (x, y) {
  return x + y;
}, handler);
fproxy(1, 2) // 1
// 执行新的构造函数实例 调用construct
new fproxy(1, 2) // {value: 2}
fproxy.prototype === Object.prototype // true
fproxy.foo === "Hello, foo" // true
console.log(delete fproxy.a);