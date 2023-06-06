// useMemo 允许你通过「记住」上一次计算结果的方式在多次渲染的之间缓存计算结果

// ============= Code ================

// 定义状态数组和索引
let hookStates = [];
let hookIndex = 0;

// 定义 useMemo 函数
function useMemo(factory, dependencies) {
	// *首次调用
	if (!hookStates[hookIndex]) {
		let newMemo = factory();
		hookStates[hookIndex++] = [newMemo, dependencies];
		return newMemo;
	}

	// *非首次调用
	let [lastMemo, lastDependencies] = hookStates[hookIndex];

	// 判断传入依赖项跟上一次是否相同
	let same = dependencies.every(
		(item, index) => item === lastDependencies[index],
	);

	if (same) {
		// 依赖项相同，直接返回上一次的 memo
		hookIndex++;
		return lastMemo;
	} else {
		// 依赖项不同，重新计算 memo
		let newMemo = factory();
		hookStates[hookIndex++] = [newMemo, dependencies];
		return newMemo;
	}
}
