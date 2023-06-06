Array.prototype.length2 = function () {
	let num = 0;
	// ES6 forof 写法
	// for (const iterator of this) num++;

	// ES5 原生写法
	while (this[num] !== undefined) num++;
	return num;
};

console.log([1, 2, 3, 4].length2()); // 4
