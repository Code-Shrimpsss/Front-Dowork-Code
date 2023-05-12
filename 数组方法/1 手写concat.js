/**
 * 语法 var new_array = old_array.concat(value1[, value2[, ...[, valueN]]])
 * @param  {...any} args : 拼接的数组
 * @returns 拼接后的数组
 */

// concat 用于数组拼接
Array.prototype.concat2 = function (...args) {
    let arr = deepClone(this)
    // 它首先会创建一个当前数组的副本，然后再把它的参数添加到副本末尾，最后返回这个新构建的数组
    console.log(arr);
    console.log(args);
    // for (let i = 0; i < args.length; i++) {
    //     arr[arr] = args[i]
    // }
    return arr;
}
function deepClone(obj) {
    // 判断是否是对象
    if (typeof obj !== 'object') return obj
    // 判断是否是数组 如果是数组就返回一个新数组 否则返回一个新对象
    var newObj = obj instanceof Array ? [] : {};
    // 遍历obj
    for (var key in obj) {
        // 将key值拷贝，再层层递进拷贝对象的值
        newObj[key] = deepClone(obj[key]);
    }
    // 返回最终拷贝完的值
    return newObj;
}

let colors = ["red", "green", "blue"];
let colors2 = colors.concat2("yellow", ["black", "brown"]);
console.log(colors);
console.log(colors2);