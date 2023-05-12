// const m = new Map([[1],[2,2]]);
// const mmm = new Map();
// // console.log(mmm.size);
// const mm = new Map([['a', 1], ['b', 2]]);
// // console.log(m);
// // console.log(mm);
// console.log(m.set('c', 3));
// // for (const i of mm) {
// //     console.log(i);
// // }

// // // const m = new Map();
// // // const mm = new Map( [] );
// // console.log(m.size);
// // console.log(mm.has('a'));

// const m2 = new Map({
//     [Symbol.iterator]: function* () {
//         yield ["key1", 'vall1'];
//         yield ["key2", 'vall2'];
//         yield ["key3", 'vall3'];
//     }
// })

// for (const iterator of m2) {
//     console.log(iterator);
// }
const m2 = new Map([['key1', 'vall1'], ['key2', 'vall2']]);
m2.set("key3", "val3").set("key4", "val4"); // 设置key3和key4
console.log(m2); 
//  Map(4) {'key1' => 'vall1', 'key2' => 'vall2', 'key3' => 'val3', 'key4' => 'val4'}
console.log(m2.has('key2')); // true
console.log(m2.get('key1')); // vall1
console.log(m2.delete('key1')); // true
console.log(m2.size); // 3
m2.clear(); // 清空 
console.log(m2.size); // 0

// const Mitertor =  m2.keys.call(mm)
// console.log(Mitertor.next().value);
// console.log(m2.keys.call(mm));
// const u = new Map();
// const um = new Map([[]]);
// console.log(u);
// console.log(um);

// const mAll = new Map();
// let fun = function () { }
// mAll.set(fun, 'function').set(Symbol(), 'symbol').set({}, 'object').set([].map(i => { return i < 10 }), 'array');
// console.log(mAll);
// console.log(mAll.get(function () { }));
// console.log(mAll.get(fun));



// const m = new Map();
// const objKey = {},
//     objVal = {},
//     arrKey = [],
//     arrVal = [];
// m.set(objKey, objVal);
// m.set(arrKey, arrVal);
// objKey.foo = "foo";
// objVal.bar = "bar";
// arrKey.push("foo");
// arrVal.push("bar");
// console.log(m.get(objKey)); // {bar: "bar"} 
// console.log(m.get(arrKey)); // ["bar"]

// const m = new Map();
// const a = 0 / "", // NaN 
//         b = 0 / "", // NaN 
//         pz = +0,
//         nz = -0;

// // console.log(a === b); // false 
// // console.log(pz === nz); // true 
// m.set(a, "foo");
// m.set(pz, "bar");
// console.log(m);
// console.log(m.get(b)); // foo 
// console.log(m.get(a)); // foo 
// console.log(m.get(nz)); // bar
console.log("-----------------------------------------------------");
const kvArray = [["key1", "value1"], ["key2", "value2"]];
// const kvArray = [["key1", "value1"]];

// 使用常规的 Map 构造函数可以将一个二维键值对数组转换成一个 Map 对象
const myMap = new Map(kvArray);
myMap.get("key1"); // 返回值为 "value1"
console.log(myMap);


// 使用 Array.from 函数可以将一个 Map 对象转换成一个二维键值对数组
console.log(Array.from(myMap)); // 输出和 kvArray 相同的数组

// 更简洁的方法来做如上同样的事情，使用展开运算符
// console.log(myMap);
console.log([...myMap]);

// 或者在键或者值的迭代器上使用 Array.from，进而得到只含有键或者值的数组
console.log(Array.from(myMap.keys())); // 输出 ["key1", "key2"]



// const myMap = new Map()
// myMap.set(NaN, 'not a number')

// myMap.get(NaN)  // "not a number"

// const otherNaN = Number("333")
// console.log(otherNaN); // NaN
// // myMap.get(otherNaN)  // "not a number"
// console.log(myMap.get(otherNaN));
