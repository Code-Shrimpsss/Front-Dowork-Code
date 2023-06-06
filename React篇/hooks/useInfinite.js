// TODO: 列表无限滚动

import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';
import styles from '@styles/infinite.module.scss';
import classNames from 'classnames';

interface Props {
	hasMore: boolean;
	direction: 'vertical' | 'horizontal';
	loadMore: () => Promise<any>;
}

export default function Infinite({
	direction = 'vertical',
	hasMore,
	loadMore,
}: Props) {
	const [ref, isView] = useInView();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		// 如果进入可视区, 如果没有正在加载, 如果还有更多数据可以加载
		if (isView && !loading && hasMore) {
			setLoading(true);

			loadMore().finally(() =>
				requestIdleCallback(() => setLoading(false)),
			);
		}
	}, [isView, loading, hasMore, loadMore]);

	return (
		<div
			ref={ref}
			className={classNames(styles.container, {
				[styles.vertical]: direction === 'vertical',
				[styles.horizontal]: direction === 'horizontal',
			})}
		>
			{loading && '拼命加载中'}
			{!hasMore && '没有更多数据可以加载'}
		</div>
	);
}

// ========= styles ===========
/* infinite.module.scss

.container {
  flex-shrink: 0;
  color: #c3c3c5;
  font-size: 3.2vw;
  text-align: center;
}
.vertical {
  width: 100%;
  height: 5.6vw;
  line-height: 5.6vw;
}
.horizontal {
  width: 5.6vw;
  height: 100%;
  writing-mode: tb-rl;
  letter-spacing: 1.33vw;
}
*/
