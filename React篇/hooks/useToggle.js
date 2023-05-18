// useToggle 用于返回布尔值状态及切换布尔值状态的方法

import { useState, useCallback } from 'react';

export function useToggle(initialValue = false) {
	const [state, setState] = useState(initialValue);

	const toggleHandler = useCallback(() => {
		setState((state) => !state);
	}, []);

	return [state, toggleHandler];
}

// ----------------------------- Use ----------------------------------
/* 
import React from "react";
import useToggle from "./useToggle";

function App() {
  const [isToggle, toggle] = useToggle(false);
  return <button onClick={toggle}>{isToggle ? "world" : "Hello"}</button>;
}

export default App;
*/
