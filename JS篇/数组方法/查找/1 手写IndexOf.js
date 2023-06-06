/**
 * 语法: arr.indexOf(searchElement[, fromIndex])
 * @param {*} searchElement : 查找的元素
 * @param {*} fromIndex : 起始索引，默认为0
 * @returns {Number} 查找元素索引
 */

Array.prototype.indexOf2 = function (searchElement, fromIndex = 0) {
    if (fromIndex >= this.length) return -1;
    if (fromIndex < 0) fromIndex = this.length + fromIndex;
    for (var i = fromIndex; i < this.length; i++) {
        if (this[i] == searchElement) return i;
    }
    return -1;
}
// Language: javascript
// Path: 2 手写IndexOf.js
console.log([11, 22, 33, 44, 55, 66, 77, 88, 99].indexOf2(77, -7));