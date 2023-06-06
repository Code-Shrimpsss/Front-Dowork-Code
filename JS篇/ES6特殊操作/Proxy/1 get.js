// var pipe = function (value) {
//     var funcStack = [];
//     var oproxy = new Proxy({}, {
//         get: function (pipeObject, fnName) {
//             if (fnName === 'get') {
//                 return funcStack.reduce(function (val, fn) {
//                     return fn(val);
//                 }, value);
//             }
//             funcStack.push(window[fnName]);
//             return oproxy;
//         }
//     });
//     return oproxy;
// }
// var double = n => n * 2;
// var pow = n => n * n;
// var reverseInt = n => n.toString().split("").reverse().join("") | 0;
// pipe(3).double.pow.reverseInt.get; // 63

// const dom = new Proxy({}, {
//     get(target, property) {
//         return function (attrs = {}, ...children) {
//             const el = document.createElement(property);
//             for (let prop of Object.keys(attrs)) {
//                 el.setAttribute(prop, attrs[prop]);
//             }
//             for (let child of children) {
//                 if (typeof child === 'string') {
//                     child = document.createTextNode(child);
//                 }
//                 el.appendChild(child);
//             }
//             return el;
//         }
//     }
// });
// const el = dom.div({},
//     'Hello, my name is ',
//     dom.a({ href: '//example.com' }, 'Mark'),
//     '. I like:',
//     dom.ul({},
//         dom.li({}, 'The web'),
//         dom.li({}, 'Food'),
//         dom.li({}, '…actually that\'s it')
//     )
// );
// document.body.appendChild(el);

let data = { name: 'xiaomi', age: '33' };

let p = new Proxy(data, {
	get(target, params) {
		console.log('get', target[params]);
		return target[params];
	},
	set(target, params, value) {
		console.log('set', value);
		return (target[params] = value);
	},
});

p.age;
p.age = 12;

console.log(p);
console.log(data);

// var p = new Proxy(function () { }, {
//     construct: function (target, args) {
//         console.log('called: ' + args.join(', '));
//         // 返回必须为对象
//         return {};
//     }
// });
// // (new p(1)).value
// new p('test')
//   // "called: 1"
//   // 10
