// 用 JavaScript 写一个函数，输入 number 型，返回整数逆序后的字符串。
// 如：输入整型 1234，返回字符串“4321”。
// 要求:
// 1.必须使用递归函数调用，不能用全局变量;
// 2. 输入函数必须只有一个参数传入，必须返回字符串。

function reverseInt(num) {
	let num1 = num / 10,
		num2 = num % 10;

	if (num1 < 1) {
		return num;
	} else {
		num1 = Math.floor(num1);
		return `${num2}${reverseInt(num1)}`;
	}
}

const TEST_NUMBER = reverseInt(2134567);

console.log(TEST_NUMBER);
