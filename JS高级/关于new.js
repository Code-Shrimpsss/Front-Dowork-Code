// 1. 创建新的对象
// 2. 建立对象原型与构造函数原型之间的连接
// 3. 将对象指向构造函数
// 4. 返回实例对象

function MyNew(fn, ...args) {
	const obj = {};
	obj.__proto__ = fn.prototype;
	obj.apply(fn, args);
	return obj;
}

// 平替
// function MyNew2(fn, ...args) {
// 	var obj = Object.assign(fn.prototype);
// 	fn.call(obj, ...args);

// 	return obj;
// 	// 这种方法是利用构造函数建立连接的，有点本末倒置
// }

class FF {
	constructor(params) {
		// body...
		this.params = params;
	}
}

const ff2 = new FF('LIST');
const new1 = MyNew(FF, 'New1');

console.log(ff2);
console.log(new1);

function Test() {
	this.name = 'jack';
	this.age = 18;
	return {
		// ? : new
		content: '我有freestyle',
	};
}
console.log(new Test());

// JQuery 底层原型链机制

jQuery = function (selector, context) {
	return new jQuery.fn.init(selector, context);
};
// fn.init 实例

jQuery.fn = jQuery.prototype = {};
// fn 指向原型

init = jQuery.fn.init = function (selector, context, root) {};
// init 初始化指向 fn.init

init.prototype = jQuery.fn;
// 继承

jQuery.prototype.init.prototype === jQuery.prototype;
