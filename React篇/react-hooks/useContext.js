// useEffect 就是一个 Effect Hook，给函数组件增加了操作副作用、模拟生命周期的能力。
// 它跟 class 组件中的 componentDidMount、componentDidUpdate 和 componentWillUnmount 具有相同的用途，只不过被合并成了一个 API
// 类似 class 组件的 this.setState，但是它不会把新的 state 和旧的 state 进行合并，而是直接替换。
// 与 componentDidMount 或 componentDidUpdate 不同，使用 useEffect 调度的 effect 不会阻塞浏览器更新视图，这让你的应用看起来响应更快。

// ============= Code ================
function useContext(context) {
	return context._currentValue;
}

// 父组件
const CountCtx = React.createContext();
function ParentComp() {
	const [state, setState] = React.useState({ number: 0 });
	return (
		<CountCtx.Provider value={{ state, setState }}>
			<Child />
		</CountCtx.Provider>
	);
}

// 子组件
function Child() {
	let { state, setState } = useContext(CountCtx);
	return (
		<div>
			<p>{state.number}</p>
			<button onClick={() => setState({ number: state.number + 1 })}>
				add
			</button>
		</div>
	);
}

// =========== Use =============

let test_name = 'string';

useEffect(() => {
	console.log('Hello World');
}, [test_name]);

// =========== 概念详解 =============

// 它的工作原理是:
// 1. 在第一次调用 useEffect 时,会执行 callback 函数,并将当前的 dependencies 存储在 hookStates 状态数组中。这相当于 componentDidMount。
// 2. 在后续的再次渲染中调用 useEffect,会首先对比当前的 dependencies 和存储在 hookStates 中的最后一次 dependencies 是否相同。
// - 如果相同,则不执行 callback,直接增加 hookIndex,相当于 shouldComponentUpdate 返回 false。
// - 如果不同,则执行 callback 函数,并更新存储在 hookStates 中的最后一次 dependencies,相当于 componentDidUpdate。
// 3. useEffect 的 dependencies 参数为空数组 [] 时,相当于 componentDidMount,只会在初次渲染执行 callback 函数。
// 4. 通过在外部声明 hookStates 和 hookIndex,并在每次调用 useEffect 时更新 hookIndex,实现了在多次调用 useEffect 之间共享状态的功能。
