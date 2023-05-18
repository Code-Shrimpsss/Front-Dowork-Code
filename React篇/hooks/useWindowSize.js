// useWindowSize 用于获取浏览器窗口大小
import { useEffect, useState } from 'react';

export function useWindowSize() {
	const [windowSize, setWindowSize] = useState({
		width: undefined,
		height: undefined,
	});

	useEffect(() => {
		const handlerResize = () =>
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});

		window.addEventListener('resize', handlerResize);

		handlerResize();

		return () => window.removeEventListener('resize', handlerResize);
	}, []);

	return windowSize;
}

// ----------------------------- Use ----------------------------------
/* 
import React from "react";
import useWindowSize from "./useWindowSize";

function App() {
  const size = useWindowSize();
  return <div>{size.width}px / {size.height}px</div>;
}

export default App;
*/
