Array.prototype.myFilter = function (cb) {
	let _arr = this;
	let _arg2 = arguments[1] || window;
	let _newArr = [];
	let _item;

	// 循环原数组
	for (let index = 0; index < _arr.length; index++) {
		_item = deepClone(_arr[index]);
		// 每次有符合条件(为true)时, 就添加近新数组
		cb.apply(_arg2, [_item, index, _arr]) ? _newArr.push(_item) : '';
	}
	return _newArr;
};

let arr = [
	{ id: 1, name: 'zhangs' },
	{ id: 2, name: 'lisi' },
	{ id: 3, name: 'wanwu' },
];
let arr1 = [1, 2, 3];
const oldF = arr.filter(function (item, index, arr) {
	return item.name == 'lisi';
}, arr1);

const newF = arr.myFilter(function (item, index, arr) {
	return item.name == 'lisi';
}, arr1);

console.log(oldF);
console.log(newF);

Array.prototype.myFilter = function (callbackFn, thisArg) {
	if (typeof callbackFn !== 'function') {
		throw new Error('must be function');
	}

	const len = this.length;
	thisArg = thisArg || this;
	const _newArr = [];

	for (let i = 0; i < len; i++) {
		if (callbackFn.call(thisArg, this[i], i, this)) {
			if (typeof this[i] === 'object') {
				_newArr.push(Object.create(this[i]));
			} else {
				_newArr.push(this[i]);
			}
		}
	}
	return _newArr;
};
