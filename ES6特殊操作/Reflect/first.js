// Reflect 对象 -> object 新寄生对象
let obj = {};
// if (Reflect.defineProperty(obj, {})) console.log('yes');
// else console.log('oh');

var loggedObj = new Proxy(obj, {
	get(target, name) {
		console.log('get', target, name);
		return Reflect.get(target, name);
	},
	deleteProperty(target, name) {
		console.log('delete' + name);
		return Reflect.deleteProperty(target, name);
	},
	has(target, name) {
		console.log('has' + name);
		return Reflect.has(target, name);
	},
});

// 老写法
Function.prototype.apply.call(Math.floor, undefined, [1.75]); // 1
// 新写法
Reflect.apply(Math.floor, undefined, [1.75]); // 1
