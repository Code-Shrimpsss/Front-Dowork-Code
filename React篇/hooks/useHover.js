// useHover 用于检测鼠标是否移入移出了某一个元素

import { useEffect, useRef, useState } from 'react';

export function useHover() {
	const [isHover, setHover] = useState(false);
	const elementRef = useRef();

	useEffect(() => {
		const node = elementRef.current;

		if (!node) return;

		const handleMouseEnter = () => setHover(true);
		const handleMouseLeave = () => setHover(false);

		node.addEventListner('mouseenter', handleMouseEnter);
		node.addEventListner('mouseleave', handleMouseLeave);

		return () => {
			node.removeEventListener('mouseenter', handleMouseEnter);
			node.removeEventListener('mouseleave', handleMouseLeave);
		};
	}, []);

	return [elementRef, isHover];
}

// ----------------------------- Use ----------------------------------
/* 
import { useHover } from "hooks";

function App() {
    const [elementRef, isHover] = useHover();

    return <div ref={elementRef} >{isHover ? "⭐" : "🖐️"}</div>
}
*/
