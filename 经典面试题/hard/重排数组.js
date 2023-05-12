/*
* 重排数组
说明：给定一个长度为N的数组，N＞0，实现一个方法，将原数组头尾交替重排序
如：[al， a2, a3, aN-1， aN]重排成[al， aN, a2,aN-1, a3， aN-2,
resort(1, 2, 3, 4); 输出 [1, 4, 2, 3]
resort([1, 2, 3, 4, 5])；// 输出[1, 5, 2, 4, 3]
*/

function handleArray(array) {
	const result = [];
	const cloneArray = [...array];
	let startIndex = 0;
	let lastIndex = cloneArray.length - 1;

	while (startIndex < lastIndex) {
		result.push(cloneArray[startIndex]);
		result.push(cloneArray[lastIndex]);
		startIndex++;
		lastIndex--;
		console.log(result);
		console.log(startIndex, lastIndex);
	}

	if (startIndex === lastIndex) {
		result.push(cloneArray[startIndex]);
	}

	return result;
}

console.log(handleArray([1, 2, 3, 4, 5]));
