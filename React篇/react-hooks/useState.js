// useState 会返回一个数组：一个 state，一个更新 state 的函数。
// 类似 class 组件的 this.setState，但是它不会把新的 state 和旧的 state 进行合并，而是直接替换

// ============= Code ================

let hookStates = []; // 状态数组
let hookIndex = 0; // 索引

function useState(initialState) {
	// 默认值与维持状态特性
	hookStates[hookIndex] = hookStates[hookIndex] || initialState;

	// 利用闭包维护函数调用位置
	let currentIndex = hookIndex;

	function setState(newState) {
		// 判断传入的state是否为函数,如果是把prevState传入
		if (typeof newState === 'function') {
			newState = setState(hookStates[hookIndex]);
		}

		// 更新state
		hookStates[currentIndex] = newState;

		render();
	}

	return [hookStates[hookIndex++], setState];
}

function render() {
	console.log('视图更新');
}

// =========== Use =============

const [state, setState] = useState(0);

setState(() => state + 1);

// =========== 概念详解 =============
// 0. hookState[hookindex]: 代表当前状态(current stat) 。
//    通过 useState 等 Hook 函数在函数组件中“钩入”状态逻辑,并且通过闭包维持状态的记忆,实现前所未有的函数组件复用状态逻辑的功能。
// 1. 维持状态(state)之间的关联性。如果 每次调用 useState 时都创建新的 hookStates 和 hookIndex 变量,
//    那么不同调用得到的状态将不会关联,无法实现状态的共享。
//    通过在外部声明并维持这两个变量,可以让不同的 useState 调用得到的状态保持关联,实现状态的共享。
// 2. 实现状态的记忆特性。React Hooks 的一个特点就是状态的记忆,
//    即每次渲染时,useState 函数都会返回同一个状态,而不会重新计算。
//    如果每次调用 useState 都重新声明 hookStates 和 hookIndex 变量,
//    那么状态无法实现记忆,会在每次渲染时重新计算,这不符合 Hooks 的设计目的。
