// （百度）实现 (5).add(3).minus(2) 功能。例： 5 + 3 - 2，结果为 6

Number.prototype.add = function (num) {
	return this.valueOf() + num;
};

Number.prototype.minus = function (num) {
	return this.valueOf() - num;
};

const test_num = new Number(10).add(20).minus(2);

console.log(test_num);
