// js是一门弱语言，它在声明变量时无需确定变量的类型，js在运行时会自动判断
// function types(target) {
//     var template = {
//         "[object Array]": "array",
//         "[object Object]": "object",
//         "[object Number]": "number object",
//         "[object String]": "string object",
//         "[object Boolean]": "boolean object"
//     }
//     if (target === null)
//         return "null";
//     if (typeof (target) == "object") {
//         return template[ Object.prototype.toString.call(target)];
//     } else {
//         return typeof (target);
//     }
// }
// console.log(types(NaN));

// 重写typeof方法
function typeofs(obj) {
    var toString = Object.prototype.toString;
    var map = {
        '[object Boolean]': 'boolean',
        '[object Number]': 'number',
        '[object String]': 'string',
        '[object Function]': 'function',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object RegExp]': 'regexp',
        '[object Undefined]': 'undefined',
        '[object Null]': 'null',
        '[object Object]': 'object',
    };
    return map[toString.call(obj)];

};
console.log(typeofs());

