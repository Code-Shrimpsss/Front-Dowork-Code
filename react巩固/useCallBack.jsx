// ❗ 以上代码的问题在于每次组件重新渲染都会⽣成⼀个新的 getItems ⽅法，所以每次 List 组件接收的都是不⼀样的
// getItems ⽅法，导致组件在不该被渲染的时候被渲染了。实际上只有 number 发⽣变化后 List 组件才需要被重新
// 渲染，dark 发⽣变化 List 组件没必要重新渲染。

import { useCallback, useEffect, useState } from 'react';
function App() {
	const [number, setNumber] = useState(1);
	const [dark, setDark] = useState(false);

	const styles = {
		background: dark ? 'black' : 'white',
		color: dark ? 'white' : 'black',
	};
	const getItems = () => {
		return [number, number + 1, number + 2];
	};

	return (
		<div style={styles}>
			<input type="number" value={number} onChange={() => setNumber((prev) => prev + 1)} />
			<button onClick={() => setDark((dark) => !dark)}>button</button>
			<List getItems={getItems} />
		</div>
	);
}
function List({ getItems }) {
	const [items, setItems] = useState([]);

	useEffect(() => {
		setItems(getItems());
		console.log('update items');
	}, [getItems]);

	return (
		<div>
			{items.map((item) => (
				<p key={item}>{item}</p>
			))}
		</div>
	);
}

// good

const getItems = useCallback(() => {
	return [number, number + 1, number + 2];
}, [number]);
