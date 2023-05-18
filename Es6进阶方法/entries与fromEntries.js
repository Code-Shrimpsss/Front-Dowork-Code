// 语言感知力
// entries 返回一个给定对象自身可枚举属性的键值对数组，
// 其排列与使用 for...in 循环遍历该对象时返回的顺序一致（区别在于 for-in 循环还会枚举原型链中的属性）
// const obj = new Object({ name: "shrimpsss", age: 23 });
// Object.prototype.hobby = "Beef";
// const objEn = Object.entries(obj);
// // Object.getOwnPropertyDescriptor
// const descriptor = Object.getOwnPropertyDescriptor(obj, "name");
// const descriptors = Object.getOwnPropertyDescriptors(obj);
// console.log(descriptor);
// console.log(descriptors);
// // console.log(obj);
// console.log(objEn);

// for...in... 会自动遍历当前对象上的属性与原型上的属性
// for (let o in obj) {
//     console.log(o, obj[o]);
// }


// const obj = { name: "shrimpsss", age: 23 };


// Object.myEntries = function (obj) {
//     // 1. 创建存放数据处理后的数组
//     let _pool = [];
//     // 2. 判断是否为对象
//     // if (Object.prototype.toString.call(obj) === '[object Object]') {
//     //     for (const key in obj) {
//     //         if (obj.hasOwnProperty(key)) {
//     //             let _arr = [key, obj[key]];
//     //             _pool.push(_arr);
//     //         }
//     //     }
//     // }
//     try {
//         if (obj instanceof Object) {
//             for (const key in obj) {
//                 if (obj.hasOwnProperty(key)) {
//                     let _arr = [key, obj[key]];
//                     _pool.push(_arr);
//                 }
//             }
//         }
//     } catch (error) {
//         console.log(error);
//     }
//     return _pool;
// }

// console.log(Object.myEntries(obj));
// console.log(Object.myEntries({}));
// console.log(Object.myEntries(123));
// console.log(Object.myEntries(Symbol('123')));
// // const a = { name: "shrimpss", age: Symbol(222) };
// // const a = { name: "shrimpss", Symbol(): Symbol(222) };
// const anObj = { 100: 'a', 2: 'b', 7: 'c' };
// console.log(Object.entries(anObj));
// console.log(Object.myEntries(anObj));


// const myObj = Object.create({},
//     {
//         getFoo: { value() { return this.foo; } }
//     });
// console.log(myObj);
// myObj.foo = 'bar';
// console.log(myObj);
// console.log(Object.entries(myObj));



// fromEntries 返回新的对象
// 可以是键值对 也可以是  Map 这种特殊数据类型
const obj = { name: "shrimpsss", age: 23 };
const objEn = Object.entries(obj);
console.log(objEn);
const fe = Object.fromEntries(objEn);
console.log(fe === objEn);

Object.myFromEntries = function (obj) {
    let _obj = {};
    if (Object.prototype.toString.call(obj) == "[object Object]") {
        for (var item of obj) {
            _obj[item[0]] = item[1];
        }
    }

    return _obj;
}

console.log(Object.myFromEntries(objEn));
