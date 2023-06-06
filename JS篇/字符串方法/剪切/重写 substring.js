/**
 * 方法返回一个字符串在开始索引到结束索引之间的一个子集，或从开始索引直到字符串的末尾的一个子集
 * @param {Number} start 起始位置
 * @param {Number} end 结束位置
 * @returns {String} 返回一个新的字符串
 */

String.prototype.mysubstring = function (start, end) {
    // 1. 由于不改变原字符串 则创建一个值保存修改后都字符串
    let str = ""
    // 2. 判断没传参数
    if (!start) return undefined
    // 3. 如果头尾相等, 则返回空字符串
    if (start === end) return ""
    // 4. 判断是否超出范围
    if (start > this.length) start = this.length
    // 5. 判断是否超出范围
    if (end === undefined || end > this.length) end = this.length
    // 6. 若为负值或NaN则设置为0
    if (start < 0 || start == NaN) start = 0
    if (end < 0 || end == NaN) end = 0
    // 7. 如果起始位置大于结束位置, 则交换位置
    if (start > end) [start, end] = [end, start]
    // 8. 循环执行
    for (let i = start; i < end; i++) {
        str += this[i]
    }
    // 9. 返回新的字符串
    return str;
}
let str = "hello world"
// -2 -> 0 ; 3 , 0 ; 0, 3 ; hel
console.log(str.substring(2,-2)); // he
console.log(str); // hello world