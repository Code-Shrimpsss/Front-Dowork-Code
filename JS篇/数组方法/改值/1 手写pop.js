/**
 * pop() 方法从数组中删除最后一个元素
 * @returns {*} 并返回该元素的值
 */

Array.prototype.pop2 = function () {
    if (this.length === 0) return undefined; // 数组为空，返回undefined
    let last = this[this.length - 1]; // 获取最后一个元素
    this.length--; // 删除最后一个元素
    return last; // 返回删除的元素
}