// useLocalStorage 用于将组件状态实时同步到本地存储 (localStorage)

import { useState } from 'react';

export function useLocalStorage(key, initialValue) {
	const [storedValue, setStoredValue] = useState(() => {
		const item = window.localStorage.getItem(key);

		if (item) {
			return JSON.parse(item);
		} else {
			window.localStorage.setItem(key, initialValue);
		}

		return initialValue;
	});

	// 增强setStore方法
	const setStore = (value) => {
		const valueToStore = value instanceof Function ? value(storedValue) : value;

		setStoredValue(valueToStore);
		window.localStorage.setItem(valueToStore);
	};

	return [storedValue, setStore];
}

// ----------------------------- Use ----------------------------------
/* 
import React from "react";
import { useLocalStorage } from "./useLocalStorage";

function App() {
  const [count, setCount] = useLocalStorage("count", 0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
*/
