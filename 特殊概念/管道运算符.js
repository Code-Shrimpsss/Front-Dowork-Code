function doubleSay(str) {
    return str + ", " + str;
}
function capitalize(str) {
    return str[0].toUpperCase() + str.substring(1);
}
function exclaim(str) {
    return str + '!';
}

const quter = exclaim(capitalize(doubleSay('hello')));
console.log(quter);

// JavaScript 的管道是一个运算符，写作|>。它的左边是一个表达式，右边是一个函数。管道运算符把左边表达式的值，传入右边的函数进行求值

// 'hello'
//     |> doubleSay
//     |> capitalize
//     |> exclaim


// foo::bar;
// // 等同于
// bar.bind(foo);
// foo::bar(...arguments);
// // 等同于
// bar.apply(foo, arguments);
// const hasOwnProperty = Object.prototype.hasOwnProperty;
// function hasOwn(obj, key) {
//   return obj::hasOwnProperty(key);
// }