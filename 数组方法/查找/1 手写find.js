/**
 * 语法: arr.find(callback[, thisArg])
 * @param {*} val : 填充数组元素的值
 * @param {*} start  : 起始索引，默认为0
 * @param {*} end  : 结束索引，默认为数组长度
 * @returns {Number} : 查找到的元素
 */
Array.prototype.find3 = function (callback, thisArg) {
    for (var i = 0; i < this.length; i++) {
        if (callback.call(thisArg, this[i], i, this)) {
            return this[i];
        }
    }
    return undefined;
}

console.log([1, 2, 3, 4].find3(function (item) { return item > 2 })); // 3