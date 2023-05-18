import { useState, useTransition } from 'react';
import List from './components/List';

// function App() {
// 	const [value, setValue] = useState(0);
// 	const increse = () =>
// 		setValue((prep) => {
// 			console.log('prep', prep);
// 			return prep + 1;
// 		});
// 	return (
// 		<div className="App">
// 			{/* <input type="text" value={value} onChange={(event) => setValue(event.target.value)} /> */}
// 			{/* <List value={value} /> */}
// 			<h4>{value}</h4>
// 			<button
// 				type="button"
// 				onClick={() => {
// 					increse();
// 					increse();
// 				}}
// 			>
// 				Async Click
// 			</button>
// 		</div>
// 	);
// }

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
