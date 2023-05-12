// 为什么要实现?

// 在普通函数中有一个重要的概念为“函数组合”, 实际上就是把处理的函数像管道一样连接起来， 然后让数据穿过管道得到最终的结果。
// 我们想输出的是一个多层函数嵌套的运行结果，即把前一个函数的运行结果赋值给后一个函数
// belike: fn3(fn2(fn1(fn)));
// 但是这种可读性实在太差, 因此就需要使用 compose 函数来解决这个问题

// compose 的好处
// 1. 在Express,Koa等Web框架中,经常使用compose函数来组合多个中间件函数。
// 2. 管道操作。当我们需要对数据进行一系列连续的加工或转换时,可以使用compose将这些操作函数串联起来。

function fn1(x) {
	return x + 1;
}
function fn2(x) {
	return x + 2;
}
function fn3(x) {
	return x + 3;
}
function fn4(x) {
	return x + 4;
}
console.log('native', fn4(fn3(fn2(fn1(1)))));

// redux 源码写法
// 这个版本在执行compose后的函数时,每次都需要通过...args展开参数,
// 然后逐层调用next(...args),pre(next(...args))。
// 这会产生较多的函数调用和参数复制,影响性能。
// function compose(...fn) {
// 	if (fn.length === 0) return (arg) => arg;
// 	if (fn.length === 1) return fn[0];
// 	return fn.reduce((pre, next) => (...args) => {
// 		return pre(next(...args));
// 	});
// }

// 这个版本通过funcs.reduceRight()从右到左依次调用funcs中的函数,并传入参数。
// 这避免了第一版中参数的多次复制,提高了性能。
// 但是还是存在较多的函数调用开销。
// function compose(...funcs) {
// 	return (...args) => {
// 		let len = funcs.lemgth;
// 		if (len === 0) return args;
// 		if (len === 1) return funcs[0](...args);
// 		return funcs.reduceRight((x, y) => {
// 			return typeof x === 'function' ? y(x(...args)) : y(x);
// 		});
// 	};
// }

// 这个版本返回一个闭包函数,在实际调用时通过reduceRight()依次执行args中的函数。
// 这减少了函数调用次数,只在实际执行compose后的函数时产生。
// 所以在性能方面最优。
const compose = (...args) => {
	return (num) => {
		return args.reduceRight((res, cb) => cb(res), num);
	};
};

console.log('componse', compose(fn1, fn2, fn3, fn4)(1, 2, 3));
