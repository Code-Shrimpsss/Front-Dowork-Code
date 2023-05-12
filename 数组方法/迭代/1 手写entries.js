/**
 * entries() 方法返回一个新的Array Iterator对象，
 * 该对象包含数组中每个索引的键/值对
 * @returns {Iterator} 返回新的Array Iterator对象
 */

Array.prototype.entries2 = function () {
    let arr = [];
    for (let i = 0; i < this.length; i++) {
        arr[i] = [i, this[i]];
    }
    console.log(arr);
    // Symbol.iterator定义默认的迭代器
    // 返回新的Array Iterator对象
    return arr[Symbol.iterator]();
}

// function entries2(arr) {
//     let arr2 = [];
//     for (let i = 0; i < arr.length; i++) {
//         arr2[i] = [i, arr[i]];
//     }
//     return arr2[Symbol.iterator]();
// }



// var arr = ["a", "b", "c"];
// var str = "abc";
var str = { a: "a", b: "b", c: "c" };
// var str = [1, 2, 3, 4, 5];
// console.log(str.ne);
console.log(typeof str);
// console.log(entries2(str));
// let newStr = entries2(str);
// let newStr = str.entries();
// console.log(newStr.next());
// console.log(newStr.next());
// console.log(newStr.next());
// console.log(newStr.next());
// var iterator = arr.entries2();
// console.log(iterator.next().value); // [0, "a"]
// console.log(iterator.next().value); // [0, "a"]

// let a = 0
// while(a<10){
//     with(str){
//         a++;
//         console.log(b);
//     }
// }
