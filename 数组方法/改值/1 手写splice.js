/**
 * splice() 方法通过删除或替换现有元素或者原地添加新的元素来修改数组,并以数组形式返回被修改的内容
 * 此方法会改变原数组
 * @param {*} start : 起始索引，默认为0
 * @param {*} deleteCount : 要删除的元素数量，默认为0
 * @param  {...any} args : 要添加的元素或者多个元素
 * @returns {Array} 由被删除的元素组成的一个数组
 */

Array.prototype.splice2 = function (start, deleteCount, ...args) {
    // -------- start 
    // 如果没有传start或者负数的绝对值大于数组的长度，则默认从0开始
    if (start === undefined || this.length < -(start)) start = 0;
    // 如果超出了数组的长度，则从数组末尾开始添加内容
    if (start > this.length) start = this.length;
    if (start < 0) start = this.length - start;

    // -------- deleteCount
    // 如果没有传end，则默认到数组的末尾
    if (deleteCount === undefined || deleteCount > this.length - start) this.length = start

    // --------- 具体逻辑
    // 如果 deleteCount 是 0 或者负数, 则不移除元素, 改为往后添加元素
    if (deleteCount <= 0) {
        for (let i = 0; i < args.length; i++) {
            // 3 + 0 + 2 // 5 
            this[start + i + args.length - 1] = this[start + i]
            this[start + i] = args[i]
        }
        // 如果没有删除元素，则返回空数组
        return []
    } else {
        // 删除元素的数组
        let delArr = [];
        // 如果大于0, 则表示删除原来的参数而从原地添加
        for (let i = 0; i < args.length; i++) {
            delArr[i] = this[start + i]
            this[start + i] = args[i]
        }
        // 如果只删除了一个元素，则返回只包含一个元素的数组。
        return delArr;
    }
}

// let list = [1, 2, 3, 4, 5];
// console.log(list.splice2(2, 1, 55, 66));
// console.log(list);

let list = ["orange",  "test", "apple", "test2", 'pear']
console.log(list.splice(2,1, 44, 99, 55)); // [ "apple", "test2"] // 被删除的元素
console.log(list); // [ 'orange','test', 44 , 99, 55, 'pear' ] // 更改完后的数组


// Array.prototype.splice2 = function (start, deleteCount, ...args) {
//     // start规范
//     if (start === undefined || this.length < -(start)) start = 0;
//     if (start > this.length) start = this.length;
//     if (start < 0) start = this.length - start;
//     // deleteCount规范
//     if (deleteCount === undefined || deleteCount > this.length - start) this.length = start
//     // splice 核心代码
//     if (deleteCount <= 0) {
//         for (let i = 0; i < args.length; i++) {
//             this[start + i + args.length - 1] = this[start + i]
//             this[start + i] = args[i]
//         }
//         return []
//     } else {
//         let delArr = [];
//         for (let i = 0; i < args.length; i++) {
//             delArr[i] = this[start + i]
//             this[start + i] = args[i]
//         }
//         return delArr;
//     }
// }