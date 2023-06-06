var timeStamp = null;

// function getTimeStamp() {
//     if (timeStamp) {
//         console.log("1");
//         return timeStamp;
//     }

//     console.log("2");
//     timeStamp = new Date().getTime();
//     return timeStamp;
// }

// console.log(getTimeStamp());
// console.log(getTimeStamp());
// console.log(getTimeStamp());
// console.log(getTimeStamp());
// console.log(getTimeStamp());

// 问题1: 全局污染, 重复判断
// 优化: 惰性函数解决

// var getTimeStamp = (function () {
//     console.log(1);
//     var timeStamp = new Date().getTime();

//     return function () {
//         return timeStamp;
//     }
// })()

// 惰性加载表示函数执行的分支只会在函数第一个调用的时候执行，在第一次调用时,
// 该函数被覆盖为另一个按照合适的方式执行的函数，这样对原函数的调用就不用再经过执行分支了

// var getTimeStamp = function () {
//     var timeStamp = new Date().getTime();
//     console.log(1);

//     getTimeStamp = function () {
//         console.log(2);
//         return timeStamp;
//     }

//     return getTimeStamp();
// }

// console.log(getTimeStamp());
// console.log(getTimeStamp());
// console.log(getTimeStamp());
// console.log(getTimeStamp());
// console.log(getTimeStamp());

var addEvent = (function () {
	if (window.addEventListener) {
		console.log(111);
		return function (el, type, fn, capture) {
			el.addEventListener(type, fn, capture);
		};
	} else if (window.attachEvent) {
		console.log(222);
		return function (el, type, fn) {
			el.attachEvent('on' + type, function () {
				fn.call(el);
			});
		};
	} else {
		console.log(333);
		return function (el, type, fn) {
			el['on' + type] = fn;
		};
	}
})();

var addEvents = function (el, type, fn, capture) {
	if (el.addEventListener) {
		console.log(11111);
		addEvents = function (el, type, fn, capture) {
			el.addEventListener(type, fn, capture);
		};
	} else if (el.attachEvent) {
		console.log(22222);
		addEvents = function (el, type, fn) {
			el.attachEvent('on' + type, function () {
				fn.call(el);
			});
		};
	} else {
		console.log(33333);
		addEvent = function (el, type, fn) {
			el['on' + type] = fn;
		};
	}

	addEvent(el, type, fn, capture);
};

// 执行后在不改值的情况下，下次点击按钮时，
// 不改状态时就会调用上一个函数，并不会进去函数执行体（不会再执行一次）
// * 类似于 switch
const btn = document.querySelector('.btn');

addEvent(btn, 'click', btnFn1, false);
addEvents(btn, 'click', btnFn2, false);

function btnFn1() {
	console.log('A');
}

function btnFn2() {
	console.log('B');
}

// 总结: 需要多个函数执行体时在第一个执行后就不重复执行函数体达到静态访问时，可以用惰性函数
