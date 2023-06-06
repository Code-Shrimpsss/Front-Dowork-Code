
Array.prototype.unshift2 = function () {
    const arrLen = this.length;
    const addLen = arguments.length;
    // 判断是否传入了参数, 如果没有则返回原数组长度
    if (arrLen == undefined || arrLen == 0) return undefined;
    // 保存插入的数组长度
    // 重点: 循环插入数组元素
    for (let i = arrLen - 1, length = arrLen + addLen - 1; i >= 0; i--, length--) {
        this[length] = this[i];
    }
    // 将传入的参数插入到数组的开头
    for (let i = 0; i < addLen; i++) {
        this[i] = arguments[i];
    }
    // 返回数组的新长度      
    return this.length;
}

let list = [11, 22, 33];
console.log(list.unshift2(111, 222, 333, 444, 555));
console.log(list);