Array.prototype.myForEach = function (cb) {
	let _arr = this;
	var _arg2 = arguments[1] || window;
	for (let index = 0; index < _arr.length; index++) {
		cb.apply(_arg2, [_arr[index], index, _arr]);
	}
};

let arr = [
	{ id: 1, name: 'zhangs' },
	{ id: 2, name: 'lisi' },
	{ id: 3, name: 'wanwu' },
];
let arr1 = [1, 2, 3];
arr.myForEach((item, index, arr) => {
	console.log(this);
	console.log(item, index, arr);
}, arr1);

Array.prototype.myForEach = function (callBackFn, thisArg) {
	if (typeof callBackFn !== 'function') {
		throw new Error('callBackFn must be function');
	}

	thisArg = thisArg || this;
	const len = this.length;
	for (let i = 0; i < len; i++) {
		callBackFn.call(thisArg, this[i], i, this);
	}
};

// Array.prototype.myForEach = function (callback, thisArg) {
// 	if (this == null) {
// 		throw new TypeError('this is null or not defined');
// 	}

// 	if (typeof callback !== 'function') {
// 		throw new TypeError(callback + ' is not a function');
// 	}

// 	let O = Object(this);
// 	let len = O.length >>> 0;

// 	if (len === 0) return;

// 	for (let i = 0; i < len; i++) {
// 		if (i in O) {
// 			callback.call(thisArg, O[i], i, O);
// 		}
// 	}
// };
