// propertyIsEnumerable() : 检测属性是否为可枚举
// const obj = {};
// const arr = [];
// const str = "props";
// arr[0] = 111;
// obj.name = "shrimpsss";

// console.log(obj.propertyIsEnumerable('name'));
// console.log(arr.propertyIsEnumerable('0'));
// console.log(arr.propertyIsEnumerable('1'));


// Object.assign() 对象合并
// console.log(typeof Object.assign('2'));
// console.log(Object.assign('2'));
// const str1 = new String('2');
// console.log(str1 instanceof String);
// console.log(Object.assign([]));
// console.log(Object.assign({}));

// const tar = { a: 1, b: 2 };
// const source1 = { c: 4, b: 3 };
// const source2 = { a: 100, b: 2 };

// const objAss = Object.assign(tar, source1, source2);
// tar.__proto__.age = 222;
// console.log("tar", tar);
// console.log("objAss", objAss);

// console.log(tar === objAss);

// console.log(tar.__proto__);

// const invis = Object.defineProperty({}, 'invisible', {
//     enumerable: false,
//     writable: true,
//     configurable: true,
//     value: 'hello'
// })
// console.log(invis);

// Object.assign拷贝的属性是有限制的，只拷贝源对象的自身属性（不拷贝继承属性），也不拷贝不可枚举的属性（enumerable: false）
// const newobj = Object.assign({ b: "bb" }, invis);
// console.log(newobj);

// symbol 类型可以被拷贝
// console.log(Object.assign({ a: 'AA' }, { [Symbol('sym')]: 'symbol' }));


// 克隆对象
// const origin = {
//     name: 'shrimpsss', age: 22, hobby: {
//         from: 'iceLand',
//         food: "Shrimps"
//     }
// }

// 浅拷贝对象
// const clone = Object.assign({}, origin);
// origin.name = "mimo"
// origin.hobby.mike = "XXX"
// console.log(origin);
// console.log(clone);

// 完全克隆
// function clone(origin) {
//     // 返回对象的原型
//     let originProto = Object.getPrototypeOf(origin);
//     console.log(originProto);
//     return Object.assign(Object.create(originProto), origin);
// }
// origin.name = "mimo"
// origin.hobby.mike = "XXX"
// console.log(origin);
// console.log(clone(origin));

// const merge = (target, callback) => {
//     return callback(target)
// }

// console.log(merge(20, (tar) => tar * 2));

// const a1 = { age: 20 };
// const a2 = { age: 30, name: "mimo" };
// const a3 = Object.defineProperty({}, 'age', {
//     value: 40,
//     enumerable: false,
//     writable: false,
//     confinurable: false
// })
// const merge0 = Object.assign(a1, a2, a3);
// console.log(merge0);
// const merge = (target, ...source) => Object.assign(target, ...source);
// console.log(merge(a1, a2, a3));

// const merge1 = (...source) => Object.assign({}, ...source);
// console.log(merge1(a1, a2, a3));


// const target = Object.defineProperty({}, 'a', {
//     value: 40,
//     enumerable: true,
//     //  默认为不可写，若为false会报错 Uncaught TypeError
//     writable: true,
//     // configurable: false
// })
// console.log(typeof target);
// console.log(target);
// const res = Object.assign(target, { b: 2 }, { b: 3, a: 100 }, { c: 22 })

// delete target.c

// for (let k in target) {
//     console.log(k, target[k]);
// }
// for (let j in res) {
//     console.log(j, res[j]);
// }

const a1 = { age: 20 };
// get 触发器
const a2 = { get b() { console.log(100); return 22 } };
//  重写 Object.assign

Object.myAssign = (target, ...sources) => {
    // 遍历源对象
    sources.forEach((source) => {
        // 取出每一个键 - 利用 reduce的特性迭代赋值
        const desciptors = Object.keys(source).reduce((des, key) => {
            // 利用 getOwnPropertyDescriptor 来查看当前键上的自有属性是否存在（匹配）,返回其属性,否则返回undefined
            des[key] = Object.getOwnPropertyDescriptor(source, key);
            return des;
        }, {})
        Object.defineProperties(target, desciptors);
    }
    )
}

// console.log(Object.myAssign(a1, a2));
// console.log(a1);
console.log(Object.assign(a1, a2));



const object1 = {
    property1: 42
};

const descriptor1 = Object.getOwnPropertyDescriptor(object1, 'property1');

console.log(descriptor1);
console.log(descriptor1.value);


if (typeof Object.assign2 != 'function') {
    // Attention 1
    Object.defineProperty(Object, "assign2", {
        value: function (target) {
            'use strict';
            if (target == null) { // Attention 2
                throw new TypeError('Cannot convert undefined or null to object');
            }

            // Attention 3
            var to = Object(target);

            for (var index = 1; index < arguments.length; index++) {
                var nextSource = arguments[index];

                if (nextSource != null) {  // Attention 2
                    // Attention 4
                    for (var nextKey in nextSource) {
                        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                            to[nextKey] = nextSource[nextKey];
                        }
                    }
                }
            }
            return to;
        },
        writable: true,
        configurable: true
    });
}
