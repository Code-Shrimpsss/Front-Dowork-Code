// 立即执行函数 ·  IIFE  ·  Immediately Invoked Function Experssion

// 函数声明 != 函数表达式

// 加上括号就为立即执行函数
// 可以称这种行为 为 立即执行表达式行为
+(function () {
	console.log('Anything Immediately');
})(); // 应为表达式

// 立即执行函数的编写规范
// ; (function () {
//     console.log('Immediately');
// })()

// 推荐在立即执行函数前加分号
// 独立作用域
// 执行完立即销毁
// 早期利用立即执行函数实现模块化-向外抛出属性与方法
(function test(...args) {
	// console.log(test);
	console.log(args);
	console.log('Immediately');
})(1, 2, 3);
