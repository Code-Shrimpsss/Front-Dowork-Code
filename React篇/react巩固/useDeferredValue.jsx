// src/App.js
import React, { useState } from 'react';
import List from './List';

function App() {
	const [value, setValue] = useState('');
	return (
		<>
			<input type="text" value={value} onChange={(event) => setValue(event.target.value)} />
			<List value={value} />
		</>
	);
}

export default App;

// src/List.js
import React, { useDeferredValue, useMemo } from 'react';

function List({ value }) {
	// 获取一个延迟更新的值, 当 React 空闲时再更新的值.
	const deferredValue = useDeferredValue(value);
	const list = useMemo(() => {
		let values = [];
		for (let i = 0; i < 10000; i++) {
			values.push(<div key={i}>{value}</div>);
		}
		return values;
	}, [deferredValue]);
	return list;
}

//   export default List;
