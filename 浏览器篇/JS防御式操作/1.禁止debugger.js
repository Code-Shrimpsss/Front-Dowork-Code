(() => {
	function block() {
		setInterval(() => {
			debugger;

			// 进阶;
			// 在原有的基础上，把debugger改为Function("debugger")()，用来防御下方（解决方案）操作
			// 通过 Function 构造器生成的 debugger 会在每一次执行时开启一个临时 js 文件
			// Function('debugger')();
		}, 50);
	}

	try {
		block();
	} catch (err) {}
})();

// 解决方法
// 1. 给 setInterval 方法的添加 禁止断点（Deactivate breakpoints）
// 2. 在 debugger 行数添加 logpoint，写入 false
// 3. 将 debugger 添加到 ignore list 中
