Array.prototype.myForEach = async function (callback, thisArg) {
    const _arr = this,
        _isArray = Array.isArray(_arr),
        _thisArg = thisArg ? Object(thisArg) : window;

    if (!_isArray) {
        throw new TypeError(`The caller of myForEach must be the type is "Array"`)
    }

    for (let index = 0; index < _arr.length; index++) {
        await callback.call(_thisArg, _arr[index], index, _arr);
    }
}


// 1 -- Js 底层用字符串解析
// const fn = new Function('a', 'b', 'c', 'console.log(a+b*c)');
// const fn1 = new Function('a, b, c', 'console.log("Fn1: " + (a+b*c))');

// fn(2, 3, 4);
// fn1(2, 3, 4);

// 2 --- new Function 声明在全局
// var a = 1, b = 2;
// function test() {
//     var b = 10;
//     // return new Function('c', 'console.log(a+b+c)')
//     eval('!function _ (c) { console.log(a+b+c)} (4)')
// }

// test();
// const t = test();
// t(5);

/**
 * Node 环境下:
 * ReferenceError: a is not defined
 *
 * 浏览器 环境下:
 * new Function 声明在全局
 *
 * eval 块中:
 * 会根据上下文执行当前作用域
 *
 */

// 3 --- 使用 Eval 可以执行模块代码
// let code = `!function _ (params) {
//     console.log(params);
// }(5)`
// console.log(code);
// eval(code);


// 4 --- Function 与 new Function
// let fn = Function();
// let Nfn = new Function();

// console.log(fn == Nfn);
// console.log(fn.__proto__ == Nfn.prototype);
// console.log(fn.prototype == Nfn.prototype);

// console.log(Nfn.__proto__ == Function.prototype);
// console.log(fn.__proto__ == Function.prototype);
// console.log(fn.__proto__ == Function.__proto__);


// 5 ---
// var x = 1;
// function test(x, y = function () {
//     x = 3;
//     console.log(x); // 3
// }) {
//     console.log(x); // undefined
//     var x = 2;
//     y();
//     console.log(x); // 2
// }

// test();
// console.log(x); // 1

// 预编译在全局执行前的三部曲
// 1. 创建GO(global object)对象 ()
// 2. 找变量声明，将变量声明作为GO对象的属性名，值赋予undefined
// 3. 找全局里的函数声明 ，将函数名作为GO对象的属性名，值赋予函数体

// 预编译在函数执行前的四部曲
// 1. 创建AO对象（活动对象activation object）
// 2. 到函数体作用域里找形参和变量声明，将形参和变量声明作为AO对象的属性名，值为undefined。
// 3. 将实参和形参统一
// 4. 在函数体里找函数声明，将函数名作为AO对象的属性名，值赋予函数体

// 6 - 异步执行问题
// 将以下代码的同步行为转换为异步按顺序执行
fun([
    () => console.log('start'),
    () => sleep(1000),
    () => console.log('1'),
    () => sleep(2000),
    () => console.log('2'),
    () => sleep(3000),
    () => console.log('end'),
])

// function sleep(ms) {
//     return setTimeout(() => { }, ms);
// }

// function fun(arr) {
//     for (let index = 0; index < arr.length; index++) {
//         arr[index]();
//     }
// }

function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    })
}
// 问题2 解决 forEach 同步化的问题
async function fun(arr) {
    arr.myForEach(async (fn) => {
        await fn();
    })
}





