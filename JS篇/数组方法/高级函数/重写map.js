Array.prototype.myMap = function (cb) {
	let _arr = this;
	let _len = _arr.length;
	let _arr2 = arguments[1] || window;
	let _newArr = [];
	let _item;
	let _res;

	for (let index = 0; index < _len; index++) {
		// 将每个子元素都引用深拷贝
		_item = deepClone(_arr[index]);
		// 将每次处理后的数据保存
		_res = cb.apply(_arr2, [_item, index, _arr]);
		// 如果有数据就保存在新数组中
		_res && _newArr.push(_res);
	}

	return _newArr;
};

let arr = [23, 123, 412, 422];
let arr1 = [1111];
// arr.myMap(function (item, index, arr) {
// 	console.log(item, index, arr, this);
// }, arr1);

Array.prototype.myMap = function (callbackFn, thisArg) {
	if (typeof callbackFn !== 'function') {
		throw new Error('callbackFn must be function');
	}

	const arr = [];
	thisArg = thisArg || this;
	const len = this.length;

	for (let i = 0; i < len; i++) {
		arr.push(callbackFn.call(thisArg, this[i], i, this));
	}

	return arr;
};

const arrsss = arr.myMap(function (item, index, arr) {
	console.log(item, index, arr, this);
}, arr);
console.log(arrsss);

Array.prototype.myMapToo = function (callBackFn, thisArr) {
	if (Object.prototype.toString.call(callBackFn) !== '[object Function]') {
		throw new TypeError('The CallBack is Not Function!');
	}

	thisArr = thisArr || this;
	let _len = thisArr.length;
	let _arr = [];

	for (let i = 0; i < _len; i++) {
		// this, ...arr
		callBackFn.call(thisArr, this[i], i, this);
	}
};
