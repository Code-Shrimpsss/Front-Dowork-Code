// 方法1: Set 去重
function defuplication(arr) {
	return [...new Set(arr)];
	// or
	// return Array.from(new Set(arr));
}

// 方法2: Map记录
function defuplication(arr) {
	const newArr = [];

	// 采用 Map类型 进行记录
	arr.reduce((pre, next) => {
		// 如果前面的数据中没有重复值
		if (!pre.has(next)) {
			pre.set(next, '有了');
			newArr.push(next);
		}
		return pre;
	}, new Map());

	return newArr;
}

// 方法3: filter()
function defuplication(arr) {
	return arr.filter((item, index, array) => array.indexOf(item) === index);
}

let arr = [3, 1, 2, 7, 3, 4, 5, 5, 4, 7];
console.log(defuplication(arr));
