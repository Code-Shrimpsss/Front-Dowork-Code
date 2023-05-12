// setinterval 用来实现循环定时调用 可能会存在一定的问题
// 弊端:
// 1.对自己执行的代码不关心: 即使调用的代码报错了，它依然会持续的调用下去
// 2.无视网络延迟: 如果网络状况不良，一个请求发出，还没有返回结果，它会坚持不懈的继续发送请求，最后导致的结果就是请求堆积
// 3.它并不定时: 果它调用的代码执行的时间小于定时的时间，它会跳过调用，这就导致无法按照你需要的执行次数或无法得到你想要的结果

// setTimeout 实现 setInterval
function mySettimeout(fn, delay) {
	let timer = null;
	function interval() {
		fn();
		timer = setTimeout(interval, delay);
	}
	interval();
	return {
		cancel: () => {
			clearTimeout(timer);
		},
	};
}

// setInterval 实现 setTimeout
function mySetInterval(fn, delay) {
	const timer = setInterval(() => {
		fn();
		// * 每次执行完就清除
		clearInterval(timer);
	}, delay);
}

mySetInterval(() => {
	console.log('test');
}, 100);

// mySettimeout(() => {
//     console.log('settimeout');
// }, 1000);

// let a = mySettimeout(() => {
//     console.log(111);
// }, 1000)
// let b = mySettimeout(() => {
//     console.log(222)
// }, 1000)
