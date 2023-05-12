import { useLayoutEffect, useRef, useState } from 'react';

function App() {
	const [isShow, setIsShow] = useState(false);
	const divRef = useRef();

	useLayoutEffect(() => {
		if (!divRef.current) return;

		divRef.current.style.top = '100px';
	}, [isShow]);

	return (
		<>
			<button onClick={() => setIsShow(!isShow)}>button</button>

			{isShow ? (
				<div ref={divRef} style={{ position: 'absolute' }}>
					div
				</div>
			) : null}
		</>
	);
}
