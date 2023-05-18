import { forwardRef, useRef } from 'react';

// ref
function App() {
	const username = useRef();
	const handler = () => console.log(username); // {current: input}
	return <input ref={username} onChange={handler} />;
}

// forwardRef
// src/App.js
import { useEffect, useRef } from 'react';
import Message from './Message';
function App() {
	const messageRef = useRef();
	useEffect(() => {
		console.log(messageRef.current);
	}, []);
	return <Message ref={messageRef} />;
}
export default App;

// src/Message.js
function Message(props, ref) {
	return <span ref={ref}>I am span</span>;
}

// export default forwardRef(Message);

import { useState } from 'react';
function App() {
	let inialState = 0;
	for (let i = 0; i < 100000000; i++) {
		inialState += i;
	}

	const [number, setNumber] = useState(inialState);
	return <button onClick={() => setNumber((prev) => prev + 1)}>{number}</button>;
}
// export default App;

function App() {
	const [number, setNumber] = useState(() => {
		let inialState = 0;
		for (let i = 0; i < 100000000; i++) {
			inialState += i;
		}
		return inialState;
	});

	return <button onClick={() => setNumber((prev) => prev + 1)}>{number}</button>;
}
