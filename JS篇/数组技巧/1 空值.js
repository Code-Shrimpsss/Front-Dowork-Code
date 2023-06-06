function test(arr) {
	return Array.prototype.slice.call(arr);
}

console.log(test(2, 34, 'hello', { a: 11 }));
let arr = Array.prototype.slice.call(2, 34, 'hello', { a: 11 });
console.log(arr);

// 空位置正题
let arr1 = [, , , , ,];
console.log(arr1.length);
console.log(...arr1);
console.log(Array.of(...[, , ,]));
let arr2 = [1, , , , 5, 7];
console.log(arr2.map(() => 6));
console.log(arr2.join('-'));

// 关于迭代器对象
let arra = arr1.entries();
let arrb = arr1.keys();
let arrc = arr1.values();
console.log(arra.next());
console.log(arrb.next());
console.log(arrc.next());
// 如果要把数组从一个框架传 给另一个框架，则这个数组的构造函数将有别于在第二个框架内本地创建的数组
// if (arr1 instanceof Array) { console.log(true); }
// if (Array.isArray(arr1)) { console.log(true); }

const zeroes = [0, 0, 0, 0, 0];
zeroes.fill(5);
console.log('填充:', zeroes);
zeroes.fill(9, 2);
console.log('填充索引大于:', zeroes);
zeroes.fill(7, 1, 3); // 索引大于一小于三的为七
console.log('填充大于小于:', zeroes);
zeroes.fill(8, -5, -3);
console.log('填充负值:', zeroes);

// let ints, reset = () => ints = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
let ints = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
// console.log(reset());
function r() {
	return (ints = () => [0, 1, 2, 3, 4]);
}
// console.log(r.ints);
// ints.copyWithin(3);
// console.log('copyWithin复制:', ints);
// console.log(ints);
// ints.copyWithin(4,5);
// console.log(ints);

// ints.copyWithin(2, 0, 6);
// console.log(ints);

let sorts = [1, 44, 22, 5, 9, 2, 10];
sorts.forEach((i) => {
	console.log(i, '的编码排序为', i.toString().codePointAt());
});
// 都返回调用它们的数组的引用
console.log(sorts.sort());
function compare(value1, value2) {
	return value2 - value1;
}
console.log(sorts.sort((a, b) => a - b));
