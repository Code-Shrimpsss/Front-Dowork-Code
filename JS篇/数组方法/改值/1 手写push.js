/**
 * push() 方法将一个或多个元素添加到数组的末尾
 * @param {*} args 要添加的元素
 * @returns {*} 数组的新长度
 */

Array.prototype.push2 = function (...args) {
    // 判断是否传入了参数, 如果没有则返回原数组长度
    if (args.length === 0) return this.length;
    // 循环执行args的每个元素，将元素添加到数组的末尾
    for (let i = 0; i < args.length; i++) {
        // this.length是数组的长度，每次添加一个元素，长度加1
        this[this.length] = args[i];
    }
    // 返回数组的新长度
    return this.length;
}

console.log([1, 2, 3].push2(4, 5, 6));