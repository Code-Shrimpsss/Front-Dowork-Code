/**
 * @param {*} left  要检测的值
 * @param {*} right  要检测的类型
 * @returns {Boolean} 返回布尔值
 */

function Instanceof(left, right) {
	// 循环执行left的原型链上的每个属性，如果找到right，则返回true，否则返回false
	while (true) {
		// 如果left的原型链上没有属性，则返回false
		if (left == null) {
			return false;
		}
		// 如果left的原型链上的属性和right相同，则返回true
		if (left.__proto__ === right.prototype) {
			return true;
		}
		// 否则，继续循环执行left的原型链上的每个属性
		left = left.__proto__;
	}
}

function myInstanceof(left, right) {
	// 获取left的原型
	let proto = Object.getPrototypeOf(left);
	// 获取right的原型
	let prototype = right.prototype;

	while (true) {
		// 如果left的原型链上没有属性，则返回false
		if (!proto) return false;
		// 如果left的原型链上的属性和right相同，则返回true
		if (proto === prototype) return true;

		// 否则，继续循环执行left的原型链上的每个属性
		proto = Object.getPrototypeOf(proto);
	}
}

class Person {
	constructor(name) {
		this.name = name;
	}
}

class Student extends Person {
	constructor(name, study) {
		super(name);
		this.study = study;
	}
}

const student = new Student('小明', '计算机');
console.log(Instanceof(student, Object));
console.log(myInstanceof(student, Object));

console.log(-0 === +0); // true
console.log(Object.is(-0, +0)); // false

console.log('----------------------------');
