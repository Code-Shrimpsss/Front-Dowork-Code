// function deepClone(obj) {
//     // 判断是否是对象
//     if (typeof obj !== 'object') return obj
//     // 判断是否是数组 如果是数组就返回一个新数组 否则返回一个新对象
//     var newObj = obj instanceof Array ? [] : {};
//     // 遍历obj
//     for (var key in obj) {
//         // 将key值拷贝，再层层递进拷贝对象的值
//         newObj[key] = deepClone(obj[key]);
//     }
//     // 返回最终拷贝完的值
//     return newObj;
// }

// function deepClone(origin, target) {
//     /**
//      * 判断是否是对象
//      * @param {*} origin : 原始值
//      * @param {*} target : 目标值
//      * @return {Boolean}
//      */

//     // 判断是否是对象
//     let tar = target || {};
//     // 深层遍历每一项
//     for (let k in origin) {
//         // hasOwnProperty() 方法用来检测一个对象自身的属性是否属于指定对象
//         if ( origin.hasOwnProperty(k)) {
//             // 判断当前元素是否是对象
//             if (typeof origin[k] === 'object' && origin[k] !== null) {
//                 // 判断其是否是数组
//                 tar[k] = Object.prototype.toString.call(origin[k]) === '[object Array]' ? [] : {};
//                 // 再次递归拷贝
//                 deepClone(origin[k], tar[k]);
//             } else {
//                 // 如果不是对象，则直接拷贝
//                 tar[k] = origin[k];
//             }
//         }
//     }
//     return tar;
// }

// var obj = {
//     a: 1,
//     b: {
//         c: 2,
//         d: {
//             e: 3
//         }
//     },
//     f: [1, 2, 3, { a: 1, b: 2 }]
// };

// var newObj = deepClone(obj, {});
// obj.f[2] = 222;
// console.log(obj);
// console.log(newObj);

// // var obj2 = deepClone(obj);
// // obj.b.c = 3;
// // obj.b.d.e = 4;
// // obj.f[3].b = "BB";
// // console.log(obj);
// // console.log(obj2);

// // let arr = [1, 2, { k: "KK", name: 'Shrimps' }, 4, 5, { a: 1, b: 2 }];
// // let arr2 = deepClone(arr);
// // arr[2].name = "Shrimps2";
// // arr[5].b = "BB2";
// // arr2[4] = "BB";
// // console.log(arr);
// // console.log(arr2);

// let obj = {
// 	id: 1,
// 	name: '张三',
// 	age: 10,
//         msg: {
//             age: 18
//         }
// }
// let newObj = JSON.parse(JSON.stringify(obj))
// newObj.age = 20
// obj.msg.age = 20;
// console.log(obj);
// console.log(newObj);
// console.log('年龄--', obj.age)  // 结果为 10

// let obj = {a:'1',b:'2',c:'3', arr:[ 1, 2, 3, { a: 1, b: 2 }]};
// let newObj = new obj.constructor();
// newObj.name = '张三';
// console.log(obj);
// console.log(newObj);

// 通用版本
// function deepClone(origin) {
// 	// 1. 判断是否为空或如果不是引用值 则返回
// 	if (origin === undefined || typeof origin !== 'object') return origin

// 	// 2. 判断是否为 Date(时间) 或 RegExp(正则)
// 	if (origin instanceof Date) return new Date(origin)
// 	if (origin instanceof RegExp) return new RegExp(origin)

// 	// 3. 利用原型构造器拷贝新对象
// 	const target = new origin.constructor()

// 	// 4. 循环遍历拷贝
// 	for (let key in origin) {
// 		// 判断是否为引用类型
// 		if (origin.hasOwnProperty(key)) {
// 			target[key] = deepClone(origin[key])
// 		}
// 	}

// 	return target
// }

// let obj = {
// 	a: 1,
// 	b: {
// 		c: 2,
// 	},
// 	t: new Date(2020 - 10 - 6),
// 	r: new RegExp('/k<word>$g'),
// }

// let newObj = deepClone(obj)
// obj.b.c = 3
// newObj.name = 'Shrimps'
// console.log(newObj)
// console.log(obj)

// 问题: 两个对象相互拷贝，会照成什么问题？
// 拷贝后再拷贝 会造成死循环
// Uncaught RangeError: Maximum call stack size exceeded

// let test1 = {}
// let test2 = {}
// test2.test1 = test1
// test1.test2 = test2
// console.log(deepClone(test1))

// 循环引用版 ------------------
// 利用 WeakMap() 在属性遍历完绑定,并在每次循环时获取当前键名，如果存在则返回数据，不存在则拷贝
// function deepClone(origin, hashMap = new WeakMap()) {
// 	// 判断是否是对象
// 	if (origin == undefined || typeof origin !== 'object') return origin;
// 	// 判断是否是Date类型
// 	if (origin instanceof Date) return new Date(origin);
// 	if (origin instanceof RegExp) return new RegExp(origin);

// 	// 判断是否是数组
// 	const hashKey = hashMap.get(origin);
// 	// 如果是数组
// 	if (hashKey) return hashKey;

// 	// 从原型上复制一个值
// 	// *:利用原型构造器获取新的对象 如: [], {}
// 	const target = new origin.constructor();
// 	// 将对象存入map
// 	hashMap.set(origin, target);
// 	// 循环遍历当前层数据
// 	for (let k in origin) {
// 		// 判断当前属性是否为引用类型
// 		if (origin.hasOwnProperty(k)) {
// 			target[k] = deepClone(origin[k], hashMap);
// 		}
// 	}
// 	return target;
// }

// // 最终版 structorClone
// function deepClone(origin, hashMap = new WeakMap()) {
// 	// 判断是否是对象
// 	if (origin == undefined || typeof origin !== 'object') return origin;

// 	// 检测Function类型（函数）
// 	// 通过将函数转换字符串，再截取函数内字符串的操作来进行深拷贝
// 	if (origin instanceof Function) {
// 		let str = origin.toString();
// 		let subStr = str.subString(str.indexOf('{'), 1, str.lastIndexOf('}'));
// 		return new Function(subStr);
// 	}

// 	// 检测Date类型（时间）
// 	if (origin instanceof Date) return new Date(origin.getTime());
// 	// 检测RegExp类型（正则）
// 	if (origin instanceof RegExp) return new RegExp(origin);
// 	// 检测Set类型（集合）
// 	if (origin instanceof Set) return new Set([...origin]);
// 	// 检测Map类型（哈希）
// 	if (origin instanceof Map) return new Map([...origin]);
// 	// 检测WeakSet类型（弱集合）
// 	if (origin instanceof Set) return new WeakSet([...origin]);
// 	// 检测WeakMap类型（弱哈希）
// 	if (origin instanceof Map) return new WeakMap([...origin]);
// 	// 检测Uint8Array类型（二进制）
// 	if (origin instanceof Uint8Array) return new Uint8Array(origin);
// 	// 判断是否是Smybol类型 -> 比较复杂的基本数据类型，下方还有额外处理
// 	if (typeof origin === 'symbol') return Symbol(originValue.description);
// 	// 检测BigInt（特大数字）-> 虽然不是引用类型，但为了完备性，还是加上了
// 	if (typeof origin === 'bigint') return new BigInt(origin);

// 	// 这条优化了，先has性能比先get较好。 has(O(1)) < get(O(n))
// 	if (hashMap.has(origin)) return hashMap.get(origin);

// 	// 从原型上复制一个值
// 	// *:利用原型构造器获取新的对象 如: [], {}
// 	const target = new origin.constructor();

// 	const cloneSymbol = (sym) => {
// 		if (hashMap.has(sym)) return hashMap.get(sym);
// 		const newSym = Symbol(sym.description);
// 		hashMap.set(sym, newSym);
// 		return newSym;
// 	};

// 	// 检测Symbol类型（符号）
// 	// 通过获取源对象Symbol键，然后再递归深拷贝每个Symbol值，并赋予新对象
// 	const symbolKeys = Object.getOwnPropertySymbols(origin);
// 	for (const key of symbolKeys) {
// 		console.log('info symbol', key, origin[key]);
// 		const cloneKey = cloneSymbol(key);
// 		target[cloneKey] = deepClone(origin[key], hashMap);
// 	}

// 	// 将数据存入map
// 	hashMap.set(origin, target);

// 	// 循环遍历当前层数据
// 	for (let k in origin) {
// 		// 判断当前属性是否为引用类型,
// 		if (origin.hasOwnProperty(k)) {
// 			target[k] = deepClone(origin[k], hashMap);
// 		}
// 	}

// 	return target;
// }

// const deepClone = function (origin, hashMap = new WeakMap()) {
// 	if (origin === undefined || typeof origin !== 'object') return;

// 	if (hashMap.has(origin)) return hashMap.get(origin);

// 	if (origin instanceof Set) return new Set([...origin]);

// 	let target = new origin.constructor();

// 	hashMap.set(target);
// 	for (const key in origin) {
// 		if (origin.hasOwnProperty(key)) {
// 			target[key] = deepClone(origin[key], hashMap);
// 		}
// 	}

// 	return target;
// };

function deepCopy(target, cache = new Set()) {
	if (typeof target !== 'object' || cache.has(target)) {
		return target;
	}
	if (Array.isArray(target)) {
		target.map((t) => {
			cache.add(t);
			return t;
		});
	} else {
		return [...Object.keys(target), ...Object.getOwnPropertySymbols(target)].reduce(
			(res, key) => {
				cache.add(target[key]);
				res[key] = deepCopy(target[key], cache);
				return res;
			},
			target.constructor !== Object ? Object.create(target.constructor.prototype) : {},
		);
	}
}

const complexObj = {
	name: 'cloneMan',
	age: 99,
	address: {
		province: 'Guangdong',
		city: 'Guangzhou',
	},
	hobbies: ['music', { hobbyName: 'reading' }, new Uint8Array([1, 2, 3])],
	friends: new Set(['tom', 'jerry']),
	weakSet: new WeakSet([{ keyName: 'ws1' }, { keyName: 'ws2' }]),
	weakMapData: new WeakMap([[{ keyName: 'wm1' }, { keyName: 'wm2' }]]),
	mapData: new Map([
		['key1', 'value1'],
		['key2', 'value2'],
	]),
	dates: [new Date(2020, 0, 1), new Date(2020, 0, 2)],
	reg: /[a-z]+/g,
	fn: function () {
		console.log('fn');
	},
	bigN: 123n,
	[Symbol('sym1')]: 'symbol value1',
	[Symbol('sym2')]: 'symbol value2',
};

// 深深的拷贝一下
const cloneObj = deepCopy(complexObj);

// 修改区
cloneObj.name = 'Vito';
cloneObj.address.city = 'Shenzhen';
cloneObj.hobbies[0] = 'painting';
cloneObj.friends.add('mary');
cloneObj.weakSet.add({ keyName: 'ws3' });
cloneObj.mapData.set('key3', 'value3');
cloneObj.bigN = 224n;
cloneObj[Symbol('sym1')] = 'new symbol value';
cloneObj.dates[0] = new Date(2020, 0, 3);
cloneObj.reg = /[0-9]+/g;
cloneObj.fn = () => console.log('arrow fn');

// 对比区
console.log(cloneObj === complexObj);
console.log(complexObj);
console.log(cloneObj);
