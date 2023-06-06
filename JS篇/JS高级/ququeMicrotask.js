// queueMicrotask()方法可以在当前事件循环中的微任务队列中加入一个微任务。它的主要作用有:
// 1. 执行时机位于事件循环的微任务阶段,优先于宏任务。也就是说,通过queueMicrotask()添加的微任务会先于setTimeout()等宏任务执行。
// 2. 可以实现异步代码的串行化执行。通过queueMicrotask()添加的微任务会在本事件循环中依次执行,实现按序执行异步代码的效果。
// 3. 不会造成堆栈溢出。通过queueMicrotask()添加的微任务会在异步代码执行完后执行,而不是像Promise.then()那样串行执行,可能造成堆栈溢出的问题。

console.log('start');

setTimeout(() => {
	console.log('timer1');
	queueMicrotask(() => {
		console.log('micro1');
	});
}, 0);

queueMicrotask(() => {
	console.log('micro2');
});

setTimeout(() => {
	console.log('timer2');
}, 0);

console.log('end');

// 输出:
// start
// end
// micro2
// micro1
// timer1
// timer2

// 优点总结
// 1. 执行时机早于宏任务
// 2. 可以实现异步代码的串行化
// 3. 不会造成堆栈溢出

// 它适用于需要异步串行化执行、但又不希望造成堆栈溢出的场景。
