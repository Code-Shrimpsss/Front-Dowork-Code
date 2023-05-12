// 1. 定义一个 result 数组存储最终结果
// 2. 遍历数组 arr 的每个元素
// 3. 如果当前元素也是数组,则递归调用 flatten 函数将其展开,并拼接到 result 上
// 4. 否则直接将当前元素 push 到 result 上
// 5. 递归终止条件是当前元素不是数组,直接 push 到 result
// 6. 最终返回 result 即可

// 直接递归版
// const flatten = function (array) {
// 	let result = [];
// 	for (let index = 0; index < array.length; index++) {
// 		if (Array.isArray(array[index])) {
// 			result = result.concat(flatten(array[index]));
// 		} else {
// 			result.push(array[index]);
// 		}
// 	}
// 	return result;
// };

// 闭包递归版
// function wrap() {
// 	let result = [];

// 	return function _flatten(array) {
// 		for (const iter of array) {
// 			if (iter.constructor === Array) {
// 				result.concat(_flatten(iter));
// 			} else {
// 				result.push(iter);
// 			}
// 		}
// 		return result;
// 	};
// }

const MOCK_ARRAY = [1, 2, [3, 4], 5, [6, [7, 8, [9, 10]]]];

console.log(wrap()(MOCK_ARRAY));

// 第一个函数是常规的递归实现,在递归调用时需要将返回值赋值给 result,否则结果会丢失。
// 第二个函数使用了闭包,内部函数 _flatten 可以访问外部函数 wrap 的变量 result。在递归调用时,不需要将返回值赋值给 result,因为 _flatten 直接操作的是同一个 result。
// 也就是说,第二个函数通过闭包的方式“记住了”递归调用之间的 result,而第一个函数在每次递归调用之间,需要手动传递 result。
// 这就是为什么第二个函数在递归中不需要显式的赋值 result 的原因 - 它隐式的操作的是同一个结果数组。
// 所以,这两个函数的主要区别在于:
// 第一个函数:每层递归调用之间需要手动传递 result
// 第二个函数:通过闭包隐式的操作同一个 result,不需要手动传递
// 这也体现了闭包的强大功能,可以“记住”多层函数调用之间的状态,避免手动传递参数。
