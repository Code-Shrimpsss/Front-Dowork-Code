// 给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。

// 示例:
// 输入: [0,1,0,3,12] 输出: [1,3,12,0,0]
// 复制代码说明: 必须在原数组上操作，不能拷贝额外的数组。尽量减少操作次数 (考虑空间复杂度不考虑时间复杂度)

function zeroMove(arr) {
	let _len = arr.length,
		j = 0;

	for (let i = 0; i < _len - j; i++) {
		if (arr[i] === 0) {
			arr.push(0);
			arr.splice(i, 1);
			i--;
			j++;
		}
	}

	return arr;
}

function zeroMove(array) {
	let j = 0;
	for (let i = 0; i < array.length; i++) {
		if (array[i] !== 0) {
			array[j++] = array[i];
		}
	}

	for (let i = j; i < array.length; i++) {
		array[i] = 0;
	}

	return array;
}

const ZERO_ARR = [0, 1, 0, 3, 12];
console.log(zeroMove(ZERO_ARR));
