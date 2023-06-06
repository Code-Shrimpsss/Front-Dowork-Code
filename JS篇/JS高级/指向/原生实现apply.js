// 原生实现bind
js;
Function.prototype.fakeApply = function (context, args) {
	return (...rest) => {
		this.call(context, ...args, ...rest);
	};
};
// 这个版本的思路是:
// 1. 返回一个箭头函数
// 2. 在箭头函数内部通过this.call来传入context与args完成apply的效果
// 3. 由于箭头函数的this绑定会继承上层函数的this,所以可以直接使用this调用当前函数的call方法
// 4. 通过call拼接args与rest完成参数的传递

// 相比直接调用apply方法,这个版本主要有:
// 缺点:
// 1. 需要环境支持ES6+以使用箭头函数
// 2. 效率可能低于直接调用apply,因为多了一层函数调用
// 优点:
// 1. 不直接依赖apply方法,展示了另一种this绑定与函数调用的思路
// 2. 利用箭头函数的this绑定特性,简洁地实现了apply的效果
// 3. 扩展性强,可以通过拼接多个rest达到apply的效果

// apply
Function.prototype.bestApply = function (context, args) {
	if (typeof this !== 'function') {
		throw new TypeError('Error');
	} else if (context) {
		context = Object(context);
	} else {
		// 适用于 浏览器端 与 node端
		context = typeof window !== 'undefined' ? window : global;
	}

	context = context || this;
	args = args || [];

	let _symbol = Symbol();

	context[_symbol] = this;
	let result = context[_symbol](...args);
	delete context[_symbol];

	return result;
};

Function.prototype.myApply = function (thisArg, args) {
	if (thisArg) {
		thisArg = Object(thisArg);
	} else {
		thisArg = typeof window !== 'undefined' ? window : global;
	}

	let result;
	if (!args) {
		result = thisArg._fn();
	} else {
		result = thisArg._fn(...args);
	}
	delete thisArg._fn;
	return result;
};

// call
Function.prototype.bestCall = function (context, ...args) {
	context = context || globalThis;
	return this.bestApply(context, args);
};

// bind
Function.prototype.bestBind = function (context, ...bindArgs) {
	if (typeof this !== 'function') {
		throw new TypeError('Error');
	}
	const fn = this;
	return function (...callArgs) {
		return fn.bestApply(context, bindArgs.concat(callArgs));
	};
};

function test(args) {
	console.log(this, ...args);
}
let obj = { one: 1, two: 2 };
let arr = [33, 44];
test.bind(obj, [22, 33])();
