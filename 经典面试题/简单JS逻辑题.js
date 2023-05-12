// 题目
// 1. 某公司 1 到 12 月份的销售额存在一个对象里面
// 如下: {1:222, 2:123, 5:888}，请把数据处理为如下结构：[222, 123, null, null, 888, null, null, null, null, null, null, null]
const PRICE_DATA = { 1: 222, 2: 123, 5: 888, 10: 1212 };

// 2. 打印出 1 - 10000 之间的所有对称数
// 例如：121、1331 等

// 3. 改造下面的代码，使之输出0 - 9，写出你能想到的所有解法。
for (var i = 0; i < 10; i++) {
	setTimeout(() => {
		console.log(i);
	}, 1000);
}

// ----------------------------------------------------------------

// 答案
// 1.
function resultMount(obj) {
	return Array.from({ length: 12 }).map((_, index) => obj[index + 1] || null);
}
console.log(resultMount(PRICE_DATA));

// 2.
const SymmetryNumHandler = () => {
	return [...Array(10000).keys()].filter((x) => {
		return x.toString().length > 1 && x === Number(x.toString().split('').reverse().join(''));
	});
};

console.log(SymmetryNumHandler());

// 3.
// 第一种将 var 改为let；
// 第二种
for (var i = 0; i < 10; i++) {
	((i) => {
		setTimeout(() => {
			console.log(i);
		}, 1000);
	})(i);
}
