// 对象冻结 密封对象

// const obj = { name: 'shrimpsss', age: 222 };
// obj.__proto__.hobby = "code";
// console.log(obj);

// const obj = { name: 'shrimpsss', age: 222, arr: [1, 2, 3] };
// const objFz = Object.freeze(obj);
// objFz.__proto__.hobby = "code1";
// console.log(objFz);

// 不可增删改
function Test() {
    this.name = 'shrimpsss';
    this.age = 222;
}
const test = new Test();
// 1. freeze 不会返回新的对象
Object.freeze(test);
test.age = "33"; // 实例对象上不可改
// newTest.prototype.hobby = "Beef";
// 2. 通过构造函数原型属性可以增改
Test.prototype.firstName = "MIMO";
// 3. 对象上的属性也是可以改的
test.__proto__.lastName = "Vito";

// // ! 不可重写原型
// // -- 浅冻结 - 只有第一层可以改
// // get set 也无法修改
console.log(test);

// 实现深冻结
// Object.DeepFreeze = function (obj) {
//     // 获取每个对象中的键值
//     // 与 Object.keys的区别是它就算属性不可枚举也可以拿到
//     let _keys = Object.getOwnPropertyNames(obj);
//     if (_keys.length) {
//         _keys.forEach((key) => {
//             let _value = obj[key];
//             if (typeof _value === 'object' && _value !== null) {
//                 Object.DeepFreeze(_value);
//             }
//         })
//     }
//     return Object.freeze(obj);
// }

// let obj = {
//     a: 1,
//     b: 2,
//     c: {
//         d: 3,
//         e: {
//             f: 3
//         }
//     }
// }

// const objDfz = Object.DeepFreeze(obj);
// console.log(Object.getOwnPropertyDescriptors(objDfz));
// console.log(Object.getOwnPropertyDescriptors(objDfz.c));

// const fz = Object.freeze(obj);
// const dfz = Object.DeepFreeze(obj);
// console.log(fz === dfz);
// delete fz.b;
// delete fz.c.d;
// fz.c.e = "test";
// fz.c.name = "test";
// // console.log(fz); // { a: 1, b: 2, c: { e: 'test' } }
// console.log(Object.getOwnPropertyDescriptor(fz));
// console.log(Object.getOwnPropertyDescriptors(obj));
// console.log(Object.getOwnPropertyDescriptors(obj.c));
// delete dfz.b;
// delete dfz.c.d;
// dfz.c.e = "test";

// console.log(dfz);
// { a: 1, b: 2, c: { d: 3, e: { f: 3 } } }
