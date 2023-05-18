// src/App.js
import { useEffect, useState } from 'react';

function App() {
	const [index, setIndex] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			setIndex((prev) => prev + 1);
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	return (
		<>
			<p>{index}</p>
			<ShowName name="张三" />
		</>
	);
}

// src/ShowName.js
import { useEffect } from 'react';
function ShowName({ name }) {
	useEffect(() => {
		console.log('ShowName rendered');
	});
	return <div>{name}</div>;
}

// useMemo
// bad
import { useState } from 'react';
function App() {
	const [number, setNumber] = useState(0);
	const [dark, setDark] = useState(false);
	const styles = {
		background: dark ? 'black' : 'white',
		color: dark ? 'white' : 'black',
	};
	// ❗ 问题之一
	const double = slowFunction(number);
	return (
		<div>
			<input type="number" value={number} onChange={(event) => setNumber(event.target.value)} />
			<div style={styles} onClick={() => setDark(!dark)}>
				{double}
			</div>
		</div>
	);
}
// ❗ 问题之一
function slowFunction(n) {
	for (let i = 0; i < 1000000000; i++) {}
	return n * 2;
}

// good
import { useState, useMemo } from 'react';
function App() {
	const [number, setNumber] = useState(0);
	const [dark, setDark] = useState(false);

	// 优化之一
	const styles = useMemo(() => {
		return {
			background: dark ? 'black' : 'white',
			color: dark ? 'white' : 'black',
		};
	}, [dark]);

	// 优化之一
	const double = useMemo(() => slowFunction(number), [number]);

	return (
		<div>
			<input type="number" value={number} onChange={(event) => setNumber(event.target.value)} />
			<div style={styles} onClick={() => setDark(!dark)}>
				{double}
			</div>
		</div>
	);
}

function slowFunction(n) {
	for (let i = 0; i < 1000000000; i++) {}
	return n * 2;
}
