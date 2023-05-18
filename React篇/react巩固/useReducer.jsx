const { useReducer } = require('react');

function reducer(state, action) {
	switch (action.type) {
		case 'increment':
			return state + 1;
		case 'decrement':
			return state - 1;
		default:
			return state;
	}
}

function Counter() {
	const [count, dispath] = useReducer(reducer, 0);

	return (
		<>
			<button onClick={() => dispatch({ type: 'increment' })}>{count}</button>
			<button onClick={() => dispatch({ type: 'decrement' })}>{count}</button>
		</>
	);
}
