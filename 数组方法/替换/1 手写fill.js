/**
 * 语法: arr.fill(value[, start[, end]])
 * @param {*} val : 填充数组元素的值
 * @param {*} start : 起始索引，默认为0
 * @param {*} end : 结束索引，默认为数组长度
 * @returns 修改后的数组
 */

Array.prototype.fill2 = function (val, start, end) {
    // 如果没有传start，则默认从0开始
    if (start === undefined) start = 0;
    // 如果没有传end，则默认到数组的末尾
    if (end === undefined) end = this.length;
    // 如果start大于end，则交换两个参数的位置
    if (start > end) { [start, end] = [end, start] }
    // 循环执行start到end的每个位置，将val赋值给每个位置
    for (var i = start; i < end; i++) {
        this[i] = val;
    }
    return this;
}

console.log([1, 2, 3, 4].fill2(111)); // [111, 111, 111, 111]
console.log([1, 2, 3, 4].fill2(222, 1)); // [1, 222, 222, 222]
console.log([1, 2, 3, 4].fill2(0, 4, 2)); // [1, 2, 0, 0]
console.log([1, 2, 3, 4].fill2(0, 2, 4)); // [1, 2, 0, 0]