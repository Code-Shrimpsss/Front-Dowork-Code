// const add = (a, b, c) => a + b + c;
// const a = currying(add, 1);
// console.log(a(2, 3));

// 把接收多个参数的函数变成一个可以接收单一参数的函数，并且返回接受余下的参数并返回结果的新函数
// 好处: 调用函数的时候，如果某一个参数在每次调用中都相同，可以避免重复传入这个参数
// function currying(fn, length) {
//     return function (...args) {
//         if (args.length >= length) return fn(...args)

//         return currying(fn.bind(null, ...args), length - args.length);
//     }
// }

// function add(...args) {
//     return args.reduce((a, b) => a + b)
// }

// add = currying(add)(1)(2)(3)
// console.log(add);

// function simpleURL(protocol, domain, path) {
//     return protocol + "://" + domain + "/" + path;
// }

// // 避免每次调用重复传参,此处使用lodash.curry
// let myURL1 = currying(simpleURL)('https', 'mysite');
// let res1 = myURL1('home.html');    //

// console.log(res1);//https://mysite/home.html

// let myURL2 = currying(simpleURL)('http', 'mysite');
// let res2 = myURL2('aboutme.html');    //

// console.log(res2);//http://mysite/aboutme.html

// const add = (...args) => args.reduce((a, b) => a + b);

// // const sum = currying(3);
// const sum = currying(add)

// // console.log(sum(1)(3));
// sum(1, 2)(3)	// 未真正求值，收集参数的和
// sum(4)		// 未真正求值，收集参数的和
// sum()		// 输出 10

// const add = (a, b, c) => a + b + c;
// const a = currying(add, 1);
// console.log(a(2, 3)); // 1 + 2 + 3=6

function add(a, b, c, d) {
	return a + b + c + d;
}

const curryingFn = currying(add);
console.log(curryingFn(1)(2)(3)(4)); // 10
// console.log(curryingFn(1, 2)(3)(4)); // 10
// console.log(curryingFn(1, 2, 3)(4)); // 10
// console.log(curryingFn(1, 2, 3, 4)); // 10

// function currying(fn) {
// 	function curried(...args) {}
// 	return curried;
// }

function currying(fn) {
	function curried(...args) {
		if (args.length >= fn.length) {
			return fn.apply(this, args);
		} else {
			return function curried2(...args2) {
				return curried.apply(this, [...args, ...args2]);
			};
		}
	}
	return curried;
}
// currying(add{a+b+c+d}) => curryingFn(1)(2)(3)(4)

// 1. currying函数接受一个fn函数作为参数,并返回一个curried函数。
// 2. curried函数首先检查当前已传入的参数个数是否大于等于fn需要的参数个数。
// 3. 如果已经大于等于,则通过apply直接调用fn函数并返回结果。
// 4. 如果尚未达到个数,则返回一个 curried2 的新函数来继续接收参数。
// 5. curried2接收到新参数后,通过递归调用curried函数并拼接新老参数,继续检查是否达到个数。
// 6. 这一过程一直重复,直到参数个数满足要求,最终执行fn函数并返回结果。

function curryingT(fn) {
	function curryied(...args) {
		if (args.length >= fn.length) {
			return fn.apply(this, args);
		} else {
			return function curryied2(...args2) {
				return curryied.apply(this, [...args, args2]);
			};
		}
	}

	return curryied;
}

const addPro = (...args) => {
	return args.reduce((pre, next) => pre + next, args[0]);
};

const addCurring = curryingT(addPro);

console.log(addCurring(0, 1, 2, 4, 6, 8));

// 实战场景： add() -> 借用柯里化思想
const currying = (fn) =>
	(judge = (...args) => (args.length >= fn.length ? fn(...args) : (...arg) => judge(...args, ...arg)));
