// 巧妙的例子
function* fibs() {
    let a = 0;
    let b = 1;
    while (true) {
        yield a;
        [a, b] = [b, a + b];
        // a = a + b;
    }
}
let [first, second, third, fourth, fifth, sixth] = fibs();
// console.log(first, second, third, fourth,fifth,sixth);

// 数组的解构赋值
function ArrayFun() {
    // 空值不受影响
    // let empty = [];
    // let [a = true] = empty;
    // console.log(empty, a);


    // 可接受默认值
    const [a, b = "B"] = ["A"];
    // 只有一个数组成员严格等于undefined时，才会使用默认值
    const [c, d = "D"] = ["C", undefined];
    // 因为默认值不为undefined，所以不会使用默认值
    const [e, f = "F"] = ["E", null];
    console.log('a', '=>', a, 'b', '=>', b, 'c', '=>', c, 'd', '=>', d, 'e', '=>', e, 'f', '=>', f);

    function Fun() {
        console.log('Fun');
    }

    // Fun会被解构，但是不会被调用
    // let [g = Fun()] = [undefined];
    // Fun不会被调用
    let [g = Fun()] = [222];

    // let [x = 1, y = x] = [];     // x=1; y=1
    // let [x = 1, y = x] = [2];    // x=2; y=2
    // let [x = 1, y = x] = [1, 2]; // x=1; y=2
    // let [x = y, y = 1] = [];     // ReferenceError: y is not defined
}

// 数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能取到正确的值

// 对象的解构赋值
function ObjectFun() {
    // let { foo, bar, baz } = { foo: "aaa", bar: "bbb" };
    // console.log(foo, bar);
    // console.log(baz);
    // 如果解构失败，变量的值等于undefine
    // let { log, sin } = Math;
    // console.log(log(10));
    // console.log(sin(20));

    let { log } = console;
    // log('hello')
    // 如果变量名与属性名不一致，必须写成下面这样
    let { first: f, second: s } = { first: 'a', second: 'b' };
    // console.log(f, s);

    // 解构嵌套赋值
    const node = {
        loc: { start: { line: 1, column: 5 } }
    }

    let { loc: { start: { line } }, loc, loc: { start } } = node;
    console.log(line, loc, start);


    // 嵌套赋值
    let obj = {};
    let arr = [];
    ({ obj: obj.prop, arr } = { obj: 123, arr: [123, 123] });
    console.log(obj, arr);

    // 报错
    // let { foo: {baz}} = {bar:'bar'}

    // 数据是怎么拿的
    const { data: res, message } = { data: [{ a: 1 }, { b: 2 }, { c: 3 }], message: 'success' };
    console.log(res);
    console.log(message);

    // 可以获取对象原型上的方法
    const obj1 = {};
    const obj2 = { foo: 'bar' };
    Object.setPrototypeOf(obj1, obj2);
    const { foo } = obj1;
    console.log(foo);

    // 定义默认值
    // const { a = 1, b = 2 } = { a: 3 }; // 3 2
    // const { a , b = 2 } = { a: 3 }; // 3 2
    // const { a: b = 2 } = { a: 3 }; // 3
    // const { a } = { a: 33 };
    // log(b);

    //  严格相等 
    // var { x: x = 3 } = { x: 5 };
    // log(x);

    // 注意写法:
    let x;
    log(x);
    // {x} = {x:1};
    ({ x } = { x: 1 });
    log(x);

    // 相当于左边直接替换右边
    log(({} = [true, false]));

    let arr1 = [1, 2, 3]
    // 属性名表达式
    let { first, 1: second, [arr1.length - 1]: last } = arr1;
    log(first, second, last);
}
// ObjectFun();

// 字符串的解构赋值
function StringFun() {
    const [a, b, c, ...d] = 'hello';
    console.log(a, b, c, d.join(''));

    const { length: len } = 'world';
    console.log(len);
}
// StringFun();

// 数值和布尔值的解构赋值
function NumberFun() {
    // 解构赋值的规则是，只要等号右边的值不是对象或数组，就先将其转为对象。
    // 由于undefined和null无法转为对象，所以对它们进行解构赋值，都会报错
    const { length: len, toString: ts } = 123;
    console.log(len === Number.prototype.length);
    console.log(ts === Number.prototype.toString);

    // const [e, f, g, ...h] = true;
    // console.log(e, f, g, h);

    // const { length: len1 } = true;
    // console.log(len1);
}
// NumberFun();

// 函数参数的解构赋值
function Fun() {
    function add([x, y]) {
        return x + y;
    }
    console.log(add([1, 2]));

    // function moves({x = 3, y = 5}){
    //     return [x, y];
    // }
    function moves({ x, y } = { x: 3, y: 5 }) {
        return [x, y];
    }

    console.log(moves({ x: 1 }));
    console.log([1, undefined, 3, undefined].map((x = 'yes') => x));
}

// Fun();

// 全部报错
let [a] = [1];
console.log(a);
// let [(a)] = [1];
// let {x: (c)} = {};
// let ({x: c}) = {};
// let {(x: c)} = {};
// let {(x): c} = {};
// let { o: ({ p: p }) } = { o: { p: 2 } };
// function f([(z)]) {return z}
// console.log(f([1]));

// [{ aa: 1 }, { bb: 2 }] = [{}, {}];
// console.log([({ aa: 1 }), { bb: 2 }] = [{}, {}]);
// SyntaxError: Invalid destructuring assignment target

// 常用场景 
// 变量解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量。
// 交互变量值
// let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };

function example() {
    return {
        foo: 1,
        bar: 2
    };
}
let { foo, bar } = example();
console.log(foo, bar);

// 参数是一组有次序的值
function f([x, y, z]) { console.log(x, y, z); }
f([1, 2, 3]);
// 参数是一组无次序的值
function f({ x, y, z }) { console.log(x, y, z); }
f({ z: 3, y: 2, x: 1 });

const map = new Map();
map.set('first', 'hello');
map.set('second', 'world');
for (let [key, value] of map) {
    console.log(key, 'is', value);
}

// 加载模块
// const { SourceMapConsumer, SourceNode } = require("source-map");

// const [aa, , ,d,e] =  [1,2,3,4,5];
// console.log(aa, d, e);
// console.log(d);

const { b } = { a: 1, b: 2 };
console.log(b);

// function f1({ id = 3, name = 'shrimpsss', age = 22 }) {
//     ...
// }