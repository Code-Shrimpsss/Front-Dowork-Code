const set = new Set([]);
const set1 = new Set([1, 2, 3, 3, 4, 5]);
set // Set(0) {}
set1 // Set(5) { 1, 2, 3, 4, 5 }
set1.size // 5
// [...set1]  [ 1, 2, 3, 4, 5 ]
set1.clear(); // 清空
set1.size // 0

// const array = [1, 2, 3, 5, 6, 7, 4, 5, 6, 5,];
const set2 = new Set([1, 2, 3, 5, 6, 7]);
// 重复加入Set时，内部判断两个值是否不同，使用的算法叫做“Same-value-zero equality”，它类似于精确相等运算符（===），主要的区别是向 Set 加入值时认为NaN等于自身，而精确相等运算符认为NaN不等于自身
set2.add(3).add(5).add(1).add({}).add({})
console.log(set2); // Set(8) { 1, 2, 3, 5, 6, 7, 4, 10 }
// Set(8) { 1, 2, 3, 5, 6, 7, {}, {} }

// =========常规用法=========
// 去除数组重复成员 - 转换为数组
console.log([...new Set(array)]);  // [ 1, 2, 3, 5, 6, 7, 4 ]
// Set 转数组的另一个方法
console.log(Array.from(set2)); // [ 1, 2, 3, 5, 6, 7, 4, 10 ]
// 去除字符串重复成员
console.log([...new Set('asdwacawcas')].join(''));  // 'asdwac'


// 遍历迭代器
// Set 结构的实例默认可遍历，它的默认遍历器生成函数就是它的values方法
console.log(Set.prototype[Symbol.iterator] === Set.prototype.values); // true
// set2.forEach((v, k) => console.log(k + ':' + v ** 2))


/// ==========继承数组方法=========
let setArr = Array.from(new Set([1, 2, 3]))
const setArrMap = setArr.map(v => v * 2);
const setArrFilter = setArr.filter(v => v > 2);
console.log(setArrMap); // [ 2, 4, 6 ]
console.log(setArrFilter); // [ 3 ]


// ==========Set 并集交集差集=========
const a = new Set([1, 2, 3]);
const b = new Set([4, 3, 2]);
// 并集
const union = new Set([...a, ...b]) // Set(4) { 1, 2, 3, 4 }
// 交集
const intersect = new Set([...a].filter(x => b.has(x))); // Set(2) { 2, 3 } 
// 差集
const difference = new Set([...a].filter(x => !b.has(x)));  // Set(2) { 1 }
console.log(a);
console.log(b);

// let obj = { "a": 1, "b": 2 }
// obj = 
// for (const iterator of obj) {
//     console.log(iterator);
// }
let SimpleClass = {
    data: [1, 2, 3, 4, 5],
    [Symbol.iterator]: function*(){
        yield this.data[0];
        yield this.data[1];
        yield this.data[2];
    }
    // [Symbol.iterator]() {
    //     let index = 0;
    //     return {
    //         next: () => {
    //             if (index < this.data.length) {
    //                 return { value: this.data[index++], done: false }
    //             } else {
    //                 return { done: true }
    //             }
    //         }
    //     }
    // }
}

// for (const val of SimpleClass) {
//     console.log(val)   //'1' '2' '3' '4' '5'
// }
console.log(SimpleClass);

