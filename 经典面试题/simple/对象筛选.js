// 有两个对象a 和 b, 在a中找出与b相同的中的主键，删除a中的主键 （代码越精简越好！）
let a = {
	'0x123': 1,
	'0x111': 2,
	'0x456': 3,
	'0x777': 4,
	'0x999': 5,
};

let b = {
	'0x321': 1,
	'0x456': 2,
	'0x222': 3,
	'0x888': 4,
	'0x999': 5,
};

// 答案：
for (const key in a) {
	if (Object.hasOwnProperty.call(b, key)) {
		delete a[key];
	}
}
console.log(a);
