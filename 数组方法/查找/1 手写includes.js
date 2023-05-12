/**
 * includes() 方法用来判断一个数组是否包含一个指定的值
 * @param {*} elementN : 要添加到数组开头的元素或多个元素
 * @returns {Boolean} 如果包含则返回 true，否则返回 false
 */

Array.prototype.includes2 = function (element, fromIndex = 0) {
    // 如果fromIndex为负数, 则按升序从数组的末尾开始查找
    if (fromIndex < 0) fromIndex = this.length + fromIndex;
    // 循环执行fromIndex到数组长度的每个位置，判断是否包含element
    for (let i = fromIndex; i < this.length; i++) {
        if (element === this[i]) {
            return true; // 包含，返回true
        }
    }
    return false; // 不包含，返回false
}

console.log([11, "Shrimps", 33, "tt"].includes2("tt", -2));
console.log([11, "Shrimps", 33, "tt"].includes2("Tt"));