// 计算数组中每个元素出现的次数
const fruits = ['apple', 'banana', 'apple', 'orange', 'banana', 'apple'];
const count = fruits.reduce((accumulator, currentValue) => {
	accumulator[currentValue] = (accumulator[currentValue] || 0) + 1;
	return accumulator;
}, {});

console.log(count); // Output: { apple: 3, banana: 2, orange: 1 }

// - - - - - - - - - - - - - - - - -

// 拍平嵌套数组
const nestedArray = [
	[1, 2],
	[3, 4, [22, 11, [33]]],
	[5, 6],
];
const flattenedArray = nestedArray.reduce(
	(accumulator, currentValue) => accumulator.concat(currentValue),
	[],
);
console.log(flattenedArray); // Output: [1, 2, 3, 4, 5, 6]

// - - - - - - - - - - - - - - - - -

// 按条件分组
const people = [
	{ name: 'Alice', age: 25 },
	{ name: 'Bob', age: 30 },
	{ name: 'Charlie', age: 35 },
	{ name: 'David', age: 25 },
	{ name: 'Emily', age: 30 },
];

const groupedPeople = people.reduce((accumulator, currentValue) => {
	const key = currentValue.age;
	if (!accumulator[key]) {
		accumulator[key] = [];
	}
	accumulator[key].push(currentValue);
	return accumulator;
}, {});

console.log(groupedPeople);
// Output: {
//   25: [{ name: 'Alice', age: 25 }, { name: 'David', age: 25 }],
//   30: [{ name: 'Bob', age: 30 }, { name: 'Emily', age: 30 }],
//   35: [{ name: 'Charlie', age: 35 }]
// }

// - - - - - - - - - - - - - - - - -

// 将多个数组合并为一个对象
const keys = ['name', 'age', 'gender'];
const values = ['Alice', 25, 'female'];
const person = keys.reduce((accumulator, currentValue, index) => {
	accumulator[currentValue] = values[index];
	return accumulator;
}, {});
console.log(person); // Output: { name: 'Alice', age: 25, gender: 'female' }

// - - - - - - - - - - - - - - - - -

// 将字符串转换为对象
const str = 'key1=value1&key2=value2&key3=value3';

const obj = str.split('&').reduce((accumulator, currentValue) => {
	const [key, value] = currentValue.split('=');
	accumulator[key] = value;
	return accumulator;
}, {});
console.log(obj);

// Output: { key1: 'value1', key2: 'value2', key3: 'value3' }

// - - - - - - - - - - - - - - - - -

// 将对象转换为查询字符串
const params = { foo: 'bar', baz: 42 };

const queryString = Object.entries(params)
	.reduce((acc, [key, value]) => {
		return `${acc}${key}=${value}&`;
	}, '?')
	.slice(0, -1);

console.log(queryString);
// Output: "?foo=bar&baz=42"

// - - - - - - - - - - - - - - - - -

// 打印斐波那契数列
const fibonacci = (n) => {
	return [...Array(n)].reduce((accumulator, currentValue, index) => {
		if (index < 2) {
			accumulator.push(index);
		} else {
			accumulator.push(accumulator[index - 1] + accumulator[index - 2]);
		}
		return accumulator;
	}, []);
};

console.log(fibonacci(10));
// Output: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]

// - - - - - - - - - - - - - - - - -

// 检查字符串是否是回文字符串
const strs = 'starats';

const isPalindrome = strs
	.split('')
	.reduce((accumulator, currentValue, index, array) => {
		return accumulator && currentValue === array[array.length - index - 1];
	}, true);

console.log(isPalindrome);
// Output: true

// - - - - - - - - - - - - - - - - -

// 检查括号是否匹配
const strOC = '(()()())';

const balanced =
	strOC.split('').reduce((acc, cur) => {
		if (cur === '(') {
			acc++;
		} else if (cur === ')') {
			acc--;
		}
		return acc;
	}, 0) === 0;

console.log(balanced); // true

// - - - - - - - - - - - - - - - - -

// 递归获取对象属性;
const user = {
	info: {
		name: 'Jason',
		address: { home: 'Shaanxi', company: 'Xian' },
	},
};
function get(config, path, defaultVal) {
	return (
		path.split('.').reduce((config, name) => config[name], config) ||
		defaultVal
	);
}
get(user, 'info.name'); // Jason
get(user, 'info.address.home'); // Shaanxi
get(user, 'info.address.company'); // Xian
get(user, 'info.address.abc', 'default'); // default

// - - - - - - - - - - - - - - - - -
// 手写 Reduce

function myReducer(arr, callback, initialValue) {
	let accumulator = initialValue === undefined ? arr[0] : initialValue;

	for (let i = initialValue === undefined ? 1 : 0; i < arr.length; i++) {
		accumulator = callback(accumulator, arr[i], i, arr);
	}

	return accumulator;
}
