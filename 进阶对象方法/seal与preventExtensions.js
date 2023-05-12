// freeze 冻结对象 - 不可写 不可扩展 不可枚举
// seal 密封对象 - 可写 不可扩展 不可枚举
// preventExtensions 禁止扩展对象 - 可写 可枚举 不可扩展
// isSealed 是否密封 不可扩展 不可枚举
// isFrozen() 是否冻结 不可扩展 不可枚举 不可写
// isExtensible() 是否不可扩展

const eObj = {};
const isObj = {
    a: 1,
    b: {
        c: 2,
        d: {
            name: 'shtimpsss'
        }
    },
    arr: [11, 22, 33]
}

const s = Object.seal(eObj);
console.log(s);
console.log(Object.isSealed(s));
console.log(Object.isExtensible(s));
console.log(Object.isFrozen(s));

// Object.

