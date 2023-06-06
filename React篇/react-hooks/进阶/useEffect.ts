// 定义两个数组，分别用于存储 effect 和 effect 的索引
let hookEffects: any[] = [];
let hookIndices: number[] = [];

// 定义 useEffect 函数
function useEffect(callback: any, dependencies: any[]) {
	// 获取当前 effect 的索引
	let hookIndex = hookIndices[hookIndices.length - 1] || 0;

	// 如果当前 effect 不存在，则进行初始化
	if (!hookEffects[hookIndex]) {
		hookEffects[hookIndex] = {
			callback,
			dependencies,
			isMounted: true,
		};
	} else {
		// 如果当前 effect 已存在，则判断依赖是否发生变化
		let lastEffect = hookEffects[hookIndex];
		let sameDependencies = lastEffect.dependencies.every(
			(d: any, i: number) => d === dependencies[i],
		);
		if (sameDependencies && lastEffect.isMounted) {
			// 如果依赖没有变化，则无需重新执行
			return;
		} else {
			// 如果依赖发生变化或是卸载后重新挂载，则需要重新执行
			hookEffects[hookIndex] = {
				callback,
				dependencies,
				isMounted: true,
			};
		}
	}

	// 如果当前 effect 已挂载，则执行回调函数
	if (hookEffects[hookIndex].isMounted) {
		callback();
	}

	// 将当前 effect 的索引加入数组中
	hookIndices.push(++hookIndex);

	// 返回一个函数，用于卸载 effect
	return function unmount() {
		hookEffects[hookIndex].isMounted = false;
	};
}


