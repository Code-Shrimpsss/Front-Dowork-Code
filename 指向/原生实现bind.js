// 原生实现bind - 性能最优
Function.prototype.fakeBind = function (obj, ...args) {
	// 利用原生apply绑定拼接
	return (...rest) => {
		this.apply(obj, args.concat(rest));
	};
};

// function f(args) { console.log(this, args); }

// f.bind({ a: "hello" }, "world")();
// f.fakeBind({ a: "hello" }, "world")();

function test(args) {
	console.log(this, ...args);
}
let obj = { one: 1, two: 2 };
let arr = [33, 44];
test.bind(obj, arr)();
test.fakeBind(obj, arr)();

// (function () { console.log(111); })()
// let num = 10;
// async function a() {
//     return ((res=11) => {
//         return ((num) => {
//                   return num + res
//         })()
//     })() }
//     // res??
// a().then(res=> console.log(res))
// num??
// console.log('num', num);
// console.log(NaN); // not a Number
// console.log(null);
// console.log(undefined);
// // false true true false
// console.log(undefined == NaN); // not a Number
// console.log(void(0));
// console.log(void(0) == undefined);
// console.log(undefined === undefined);
// console.log(NaN == NaN);
// console.log(NaN === NaN);

// let num = 10;
async function a() {
	return (res = 11) => {
		return (num) => {
			return num + res;
		};
	};
}
// res??

// num??
// console.log('num', num);

// console.log(a());
// console.trace(a())
// let t = test.bind(obj, arr)();
// console.log(t);
// console.log(typeof t);
// // console.log(t instanceof "function");
// let x = 9;    // 在浏览器中，this 指向全局的 "window" 对象
// var module = {
//   x: 81,
//   getX: function() { return this.x; }
// };
// console.log(module.getX()); // 81
// var retrieve = module.getX;
// retrieve() // 9
// var getx = retrieve.bind(x)
// getx()

// function list(){
//     return Array.prototype.slice.call(args)
// }

// function addArgs(arg1, arg2) {
//     return arg1 + arg2;
// }

// var list1 = list(1, 2, 3); // [1, 2, 3]

// var result1 = addArguments(1, 2); // 3

// 兼容性更好
Function.prototype.myBind = function (thisArgs, ...args1) {
	thisArgs = Object(thisArgs);
	const _self = this;
	return function (...args2) {
		this.apply(obj, args.concat(rest));
		// const args1 = Array.prototype.slice.call(arguments, 1);
		return _self.apply(thisArgs, args1.concat(args2));
	};
};

Function.prototype.myBind = function (context) {
	// 保存调用 myBind() 函数的函数对象
	var fn = this;
	// 获取 myBind() 函数调用时传入的参数，不包括第一个参数（即需要绑定的 this 值或上下文对象）
	var args = Array.prototype.slice.call(arguments, 1);
	// 返回一个新函数
	return function () {
		// 获取新函数调用时的参数
		var newArgs = Array.prototype.slice.call(arguments);
		// 将新函数的参数和调用myBind()函数时传入的参数合并
		var allArgs = args.concat(newArgs);
		// 返回调用原函数时的结果
		return fn.apply(context, allArgs);
	};
};
