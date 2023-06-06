/**
 * slice方法用于截取字符串
 * @param {*} start  开始位置
 * @param {*} end  结束位置
 * @returns {string} 返回一个新的字符串
 */
String.prototype.myslice = function (start, end) {
    // 1. 由于不改变原字符串 则创建一个值保存修改后都字符串
    let str = ""
    // 2. 判断是否为负值 
    if (start < 0) start = this.length + start
    if (end < 0) end = this.length + end
    // 3. 判断是否超出范围或没传参数
    if (end === undefined || end > this.length) end = this.length
    if (start === undefined) start = 0
    // 4. 循环执行
    for (let i = start; i < end; i++) {
        str += this[i]
    }
    // 5. 返回新的字符串
    return str
}
let str = "hello world"
console.log(str.myslice(2, -4)); // ello wor
console.log(str); // hello world
