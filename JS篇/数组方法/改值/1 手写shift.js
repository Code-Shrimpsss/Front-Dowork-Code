/**
 * shift 方法移除索引为 0 的元素(即第一个元素)
 * @returns {*} 返回删除的元素
*/

Array.prototype.shift2 = function () {
    if (this.length == 0) return undefined; // 数组为空，返回undefined
    let first = this[0]; // 获取第一个元素
    // 循环执行数组的每个元素，将元素向前移动一位
    for (let i = 0; i < this.length - 1; i++) {
        // 将数组的第i个元素赋值给第i+1个元素
        this[i] = this[i + 1];
    } 
    // 更新删除数组的长度
    this.length--;
    // 返回删除的元素
    return first; 
}
let list = [11, 22, 33, 44];
// console.log(list.shift2());
console.log(list.shift());
console.log(list);