/* 
- 过滤对象的属性与获取属性Key数组
- 筛选与规范化对象的Shape
- 根据条件获取对象的子集
*/

Object.prototype.myFilter = function (callBackFn, thisArg) {
	if (typeof callBackFn !== 'function') {
		throw new Error('must be function');
	}

	thisArg = thisArg || this;
	const propsArray = [];

	for (const prop in thisArg) {
		// filter: callBackFn.call(thisArg, this[i], i, this)
		// 区别在于 prop 是对象下的引用，返回的是键
		if (callBackFn.call(thisArg, prop, this[prop], this)) {
			propsArray.push(prop);
		}
	}
};

const obj = {
	name: 'John',
	age: 30,
	city: 'New York',
};

obj.myFilter((prop) => prop.startsWith('a'));
