// 原生实现bind
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
test.bind(obj, [22, 33])();

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
a()
	.then((res) => console.log('res', JSON.parse(res)))
	.catch((err) => err);
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
