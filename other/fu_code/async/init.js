// async/await是Generator函数的语法糖,它们让异步代码看起来像同步代码,但实际上底层仍然是异步操作
// TODO: 1 入门式
// - async
async function foo() {}

// 等同于

function foo() {
	return new Promise(function (resolve, reject) {
		resolve();
	});
}

// await
let result = await bar();
// 等同于
bar().then((result) => {});

// 优点： 简化promise异步写法，捕获异步错误更简单
// 限制： 需要等到async函数执行完并返回promise,才会执行then回调。不能跨await调用另一个async函数。会产生死锁。await会暂停async函数的执行,并等待promise的完成。这意味着若await的promise一直未完成,会导致事件循环被阻塞。

async function boo() {}

function boo() {
	return new Promise(function (resolve, reject) {
		resolve();
	});
}

boo.then(() => {});
