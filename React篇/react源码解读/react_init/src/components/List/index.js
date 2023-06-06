import { useDeferredValue, useMemo } from 'react';

function List({ value }) {
	const deferredValue = useDeferredValue(value);

	// const list = useMemo(() => {
	// 	let values = [];
	// 	for (let i = 0; i < 10; i++) {
	// 		values.push(<div key={i}>{value}</div>);
	// 	}
	// 	return values;
	// }, [deferredValue]);
	const list = [];

	return list;
}

export default List;
