/* 
TODO: MutationObserver 是一种能够监听 DOM 变化的 API。

它的工作原理是:
1. 创建一个 MutationObserver 对象,并传入一个 callback 回调函数。
2. 在需要观察的 DOM 节点上调用 observe() 方法,指定需要观察的变化类型(属性变化,子节点变化等)。
3. 当指定的 DOM 发生变化时,callback 回调函数就会被执行。
4. 如果不再需要观察,可以调用 disconnect() 方法停止观察。
它的典型用途是:
1. 自动更新 UI。当某个 DOM 节点发生变化时,自动触发 UI 更新。
2. 发送网络请求。当某个 DOM 节点发生变化时,自动触发网络请求。
3. 无限滚动。当滚动到页面底部时,自动加载更多数据。
4. 惯性滑动。当手指离开屏幕时,根据滑动速度继续滑动一定距离。
*/

const observer = new MutationObserver((mutations) => {
	mutations.forEach((mutation) => {
		console.log(mutation.type); // 变化类型
		console.log(mutation.target); // 发生变化的DOM节点
	});
});

observer.observe(document.body, {
	childList: true,
	subtree: true,
});

// observer.disconnect();
