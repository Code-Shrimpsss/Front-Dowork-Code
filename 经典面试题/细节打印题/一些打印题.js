// 题目：
// 1.（京东）下面代码中 a 在什么情况下会打印1？var a = ?;
if (a == 1 && a == 2 && a == 3) {
	console.log(1);
}

// 2.
var a = 10;
(function () {
	console.log(a);
	a = 5;
	console.log(window.a);
	var a = 20;
	console.log(a);
})();

3;
var obj = {
	2: 3,
	3: 4,
	length: 2,
	splice: Array.prototype.splice,
	push: Array.prototype.push,
};

obj.push(1);
obj.push(2);
console.log(obj);

// 4.
var a = { n: 1 };
var b = a;
a.x = a = { n: 2 };
console.log(a.x);
console.log(b.x);

// 5.
// example 1
var a = {},
	b = '123',
	c = 123;
a[b] = 'b'; // a.123 = 'b'
a[c] = 'c'; // a.123 = 'c'
console.log(a[b]);
// ---------------------
// example 2
var a = {},
	b = Symbol('123'),
	c = Symbol('123');
a[b] = 'b';
a[c] = 'c';
console.log(a[b]);
// ---------------------
// example 3
var a = {},
	b = { key: '123' },
	c = { key: '456' };
a[b] = 'b';
a[c] = 'c';
console.log(a[b]);

// 6.
function Foo() {
	Foo.a = function () {
		console.log(1);
	};
	this.a = function () {
		console.log(2);
	};
}

Foo.prototype.a = function () {
	console.log(3);
};
Foo.a = function () {
	console.log(4);
};

// ----------------------------------------------------------------

// 答案：
// 1. 有三个实现思路，第一个是通过更改默认值+调用toString内部操作，使每次比较都加一（默认执行隐式装换时，会调用toString），第二个是defineproperty通过监听改动get，每次获取时就执行(后++)，第三个是改Proxy的方式，与第二个同理；还有一个正则，将第一种方式的默认值替换为正则匹配对象即可
// 2. undefined 10 20
// 3. [,,1,2]；length为4
// 4. undefined, {n:2} (因为.优先级的原因a.x先执行，即当时的a，b都在原来的引用上创建了x这个属性；再按照从右往左的方式，将a覆盖了原来的引用指针，b沿着原来的引用找到了值为{n:2}的x)
// 5. 第一次因为b的值跟c的值在进行隐式转换成键时是一直的，c的键值覆盖了b，故打印 c；第三次会进行隐式转换调用toString()，b跟c都变成了[Object Object]，而c后来居上覆盖了b，故打印 c。
// 6.
