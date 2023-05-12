// 简单实现
function debounce(fn, delay = 500) {
	let timer;
	return function () {
		// 1. 先清除前一个定时器缓存
		if (timer) clearTimeout(timer);

		// 2. 将this指向调用debounce的所指对象
		timer = setTimeout(() => {
			fn.apply(this, arguments);
		}, delay);
	};
}

// 进阶版
function debounce(fn, delay, immediate = false) {
	let timer = null;
	let isInvoke = false; // 是否调用过
	function _debounce(...args) {
		if (timer) {
			clearTimeout(timer);
		}

		// 如果是第一次调用 立即执行
		if (immediate && !isInvoke) {
			fn.apply(this.args);
			isInvoke = true;
		} else {
			// 如果不是第一次调用 延迟执行 执行完重置isInvoke
			timer = setTimeout(() => {
				fn.apply(this, args);
				isInvoke = false;
			}, delay);
		}
	}
	return _debounce;
}

// 功能型防抖
// 1. 具备立即执行功能，用于在首次点击时快速反馈
// 2. 具备取消功能，用于防止网络请求时间过长时，给用户提供取消功能
// 3. 具备函数返回值，用于给需要返回值的函数提供异步回调
function debounce(fn, delay, immediate = false) {
	let timer = null;
	let isInvoke = false;

	function _debounce(...args) {
		return new Promise((resolve, reject) => {
			if (timer) clearTimeout(timer);

			if (immediate && !isInvoke) {
				try {
					const result = fn.apply(this, arguments);
					isInvoke = true;
					resolve(result);
				} catch (err) {
					reject(err);
				}
			} else {
				timer = setTimeout(() => {
					try {
						const reult = fn.apply(this, arguments);
						isInvoke = false;
						resolve(reult);
					} catch (error) {
						reject(error);
					}
				}, delay);
			}
		});
	}

	_debounce.cancel = function () {
		clearTimeout(timer);
		timer = null;
	};

	return _debounce;
}
