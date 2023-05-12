// 1. 利用字符串与数字比较时的隐式转换
// 缺点: 无法全等

// var a = {
//     _default: 0,
//     toString: function () {
//         return ++this._default;
//     }
// }

// console.log(a._default);
// console.log(a._default);
// console.log(a == 1);
// console.log(a._default);

// 2. 利用 defineProperty 向全局挂载代理对象
// let val = 0;
// Object.defineProperty(window, "a", {
//     get() {
//         return ++val;
//     }
// })

// if (a === 1 && a === 2 && a === 3) {
//     console.log("Win⛵");
// }

// 3.利用 Proxy Getter
let a = new Proxy(
	{},
	{
		val: 1,
		get() {
			return () => this.val++;
		},
	},
);
// console.log(a);
// console.log(a);
// console.log(a);
// if (a === 1 && a === 2 && a === 3) {
//     console.log("Win⛵");
// }

if (e == 1 && e == 2 && e == 3) {
	console.log('biu');
}

// 4.利用正则表达式
// var f = {
//     reg: /\d/g,
//     valueOf() {
//         return this.reg.exec(123)[0]
//     }
// }
// if (f == 1 && f == 2 && f == 3) {
//    console.log("Win⛵");
// }
