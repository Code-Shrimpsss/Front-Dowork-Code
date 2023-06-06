// 允许你在重新渲染之间保持对相同的回调引用
// 使得 shouldComponentUpdate 继续工作

// ============= Code ================

let hookStates = []; // 状态数组
let hookIndex = 0; // 索引

function useCallback(callback, dependencies) {
	// *首次调用
	if (!hookStates[hookIndex]) {
		hookStates[hookIndex++] = [callback, dependencies];

		callback();
	}

	// *非首次调用
	let [lastCallback, lastDepencies] = hookStates[hookIndex];

	const same =
		dependencies &&
		dependencies.length === lastDependencies &&
		dependencies.every((item, index) => item === lastDependencies[index]);

	if (same) {
		hookIndex++;
		return lastCallback;
	} else {
		hookStates[hookIndex] = [callback, dependencies];
		return callback;
	}
}

// =========== Use =============

const [state, setState] = useState(0);

setState(() => state + 1);
