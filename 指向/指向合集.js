// 原生实现bind - 性能最优
Function.prototype.myBind = function (obj, ...args) {
	return (...rest) => {
		this.apply(obj, args.concat(rest));
	};
};

// 兼容性更好
Function.prototype.myBind = function (thisArgs, ...args1) {
	thisArgs = Object(thisArgs);
	const _self = this;
	return function (...args2) {
		this.apply(obj, args.concat(rest));
		// const args1 = Array.prototype.slice.call(arguments, 1);
		return _self.apply(thisArgs, args1.concat(args2));
	};
};

// 兼容性最好
Function.prototype.myBind = function (context) {
	// 保存调用 myBind() 函数的函数对象
	var fn = this;
	// 获取 myBind() 函数调用时传入的参数，不包括第一个参数（即需要绑定的 this 值或上下文对象）
	var args = Array.prototype.slice.call(arguments, 1);
	// 返回一个新函数
	return function () {
		// 获取新函数调用时的参数
		var newArgs = Array.prototype.slice.call(arguments);
		// 将新函数的参数和调用myBind()函数时传入的参数合并
		var allArgs = args.concat(newArgs);
		// 返回调用原函数时的结果
		return fn.apply(context, allArgs);
	};
};

obj.myBind(newObj, [123, 123])();
