// 开关阀思想
function throttle(fn, delay = 200) {
	// 1. 初始化节流开关
	let flag = true;

	return function () {
		// 2. 判断是否在执行中
		if (!flag) return;

		// 3. 将开关手动置为关闭状态
		flag = false;

		// 4. 执行节流定时器函数
		setTimeout(() => {
			fn.apply(this, arguments);
			flag = true;
		}, delay);
	};
}

// 时间帧思想
const throttle = function (fn, interval) {
	let nowTime;
	let lastTime = 0;

	function _throttle() {
		nowTime = new Date().getTime();
		if (nowTime - lastTime > interval) {
			fn();
			lastTime = nowTime;
		}
	}
	return _throttle;
};

// 时间帧节流进阶
function throttle(fn, interval, loading = false, trailing = false) {
	let nowTime;
	let lastTime = 0;
	let timer = null;

	function _throttle(...args) {
		nowTime = new Date().getTime(); // 首次节流
		if (!loading && lastTime === 0) {
			lastTime = nowTime;
		}

		if (timer) {
			clearTimeout(timer);
			timer = null;
		}

		if (nowTime - lastTime > interval) {
			fn.apply(this, args);
			lastTime = nowTime;
			return;
		}

		if (trailing && !timer) {
			timer = setTimeout(() => {
				fn.apply(this, args);
				timer = null;
				lastTime = 0;
			}, interval - (nowTimer - lastTime));
		}
	}
	return _throttle;
}
