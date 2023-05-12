// 每次冒泡操作都会对相邻的两个元素进行比较
// 看是否满足大小关系要求。如果不满足就让它俩互换。一次冒泡会让至少一个元素移动到它应该在的位置，重复 n 次，就完成了 n 个数据的排序工作
// 基础通用版
function bubbleSort(array = []) {
	for (let i = 0; i < array.length - 1; i++) {
		for (let j = 0; j < array.length - 1 - i; j++) {
			if (array[j] > array[j + 1]) {
				// Es6 before ----
				// let temp = array[j];
				// array[j] = array[j + 1];
				// array[j + 1] = temp;

				// Es6 after ----
				[array[j], array[j + 1]] = [array[j + 1], array[j]];
			}
		}
	}
	return array;
}

// console.time("基础版");
// console.log(bubbleSort([88, 33, 77, 44, 55, 66, 22]));
// console.timeEnd("基础版");

// console.time("优化版-减少外层遍历");
// console.log(bubbleSort1([88, 33, 77, 44, 55, 66, 22]));
// // console.log(bubbleSort1([88, 33, 65, 77, 44, 44, 55, 66, 22]));
// console.timeEnd("优化版-减少外层遍历");

// console.time("优化版-记录尾部交换");
// console.log(bubbleSort2([88, 33, 77, 44, 55, 66, 22]));
// console.timeEnd("优化版-记录尾部交换");

console.time('优化版-双向遍历');
console.log(bubbleSort3([88, 33, 77, 44, 55, 66, 22]));
console.timeEnd('优化版-双向遍历');

function bubbleSort1(array) {
	for (let i = 0; i < array.length - 1; i++) {
		// 外层循环初始值为 false，没有发生交换
		let has_exchanged = false;
		for (let j = 0; j < array.length - i - 1; j++) {
			if (array[j] > array[j + 1]) {
				[array[j], array[j + 1]] = [array[j + 1], array[j]];
				has_exchanged = true;
			}
		}
		// 内层循环结束判断一下是否发生了交换
		if (!has_exchanged) break;
	}
	return array;
}

function bubbleSort2(array) {
	// 遍历结束位置的初始值为数组尾，并逐渐向数组头部逼近
	let high = array.length - 1;
	while (high > 0) {
		// 本次内层遍历发生交换的位置的初始值
		let position = 0;
		for (let j = 0; j < high; j++) {
			if (array[j] > array[j + 1]) {
				[array[j], array[j + 1]] = [array[j + 1], array[j]];
				// 如果发生了交换，更新 position
				position = j;
			}
		}
		// 下次遍历只需要到 position 的位置即可
		high = position;
	}
	return array;
}

function bubbleSort3(array) {
	let low = 0,
		high = array.length - 1;
	while (low < high) {
		// 正向遍历找最大
		for (let i = low; i <= high; i++) {
			if (array[i] > array[i + 1]) {
				[array[i], array[i + 1]] = [array[i + 1], array[i]];
			}
		}
		high--;
		// 反向遍历找最小
		for (let j = high; j >= low; j--) {
			if (array[j] < array[j - 1]) {
				[array[j], array[j - 1]] = [array[j - 1], array[j]];
			}
		}
		low++;
	}
	return array;
}
