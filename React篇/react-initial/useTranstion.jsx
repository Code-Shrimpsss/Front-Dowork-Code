//  useTransition 方法将资源密集型任务的渲染优先级降低待 React 空闲时再执行，避免页面出现卡顿现象。
import React, { useState, useTransition } from 'react';

function App() {
	const [value, setValue] = useState('');
	const [list, setList] = useState([]);
	const [isPending, startTransition] = useTransition();

	const onChangeHandler = (event) => {
		setValue(event.target.value);

		startTransition(() => {
			let values = [];
			for (let i = 0; i < 10000; i++) {
				values.push(<li key={i}>{event.target.value}</li>);
			}
			setList(values);
		});
	};

	return (
		<>
			<input type="text" value={value} onChange={onChangeHandler} />
			{isPending ? <div>loading...</div> : <ul>{list}</ul>}
		</>
	);
}

export default App;
