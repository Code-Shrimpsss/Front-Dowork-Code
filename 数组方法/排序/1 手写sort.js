/**
 * sort() 方法用原地算法对数组的元素进行排序，并返回数组
 * @param {*} first :第一个参数
 * @param {*} second  :第二个参数
 * @returns {Array} 排序后的数组
 */
// 比较函数就是要返回小于 0、0 和大于 0 的数值，因此减法操作完全可以满足要
// 数字排序
// 字符串排序
// 符号排序
// 二进制排序

// 如果指明了 compareFunction ，那么数组会按照调用该函数的返回值排序。即 a 和 b 是两个将要被比较的元素：

// 如果 compareFunction(a, b) 小于 0 ，那么 a 会被排列到 b 之前；
// 如果 compareFunction(a, b) 等于 0 ， a 和 b 的相对位置不变。备注： ECMAScript 标准并不保证这一行为，而且也不是所有浏览器都会遵守（例如 Mozilla 在 2003 年之前的版本）；
// 如果 compareFunction(a, b) 大于 0 ， b 会被排列到 a 之前。
// compareFunction(a, b) 必须总是对相同的输入返回相同的比较结果，否则排序的结果将是不确定的。

Array.prototype.sort2 = function (first = 0, second = this.length) {
    // 如果first大于second，则交换两个参数的位置
    if (first > second) { [first, second] = [second, first] }
    // 循环执行first到second的每个位置，将val赋值给每个位置
    // for (var i = first; i < second; i++) {
    //     this[i] = val;
    // }
    for (let i = 0; i < second; i++) {
        for (let j = 0; j < second - i - 1; j++) {
            if (this[j] > this[j + 1]) {
                [this[j + 1], this[j]] = [this[j], this[j + 1]]
            }
        }
    }
    return this;
}

console.log([1, 5, 2, 8, 3, 4].sort2()); // [1, 2, 3, 4]