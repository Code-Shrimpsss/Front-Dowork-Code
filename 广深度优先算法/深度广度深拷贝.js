// 深度
const dfsDeepClone = function (origin) {
	if (origin == null) return origin;
	let target = Array.isArray(origin) ? [] : {};

	for (const key in origin) {
		if (origin.hasOwnProperty(key)) {
			if (typeof origin[key] === 'object') {
				target[key] = dfsDeepClone(target[key]);
			} else {
				target[key] = origin[key];
			}
		}
	}

	return target;
};

// 广度
const wfs = function (origin) {
	if (origin == null) return origin;
	let target = Array.isArray(origin) ? [] : {};
	let queue = [origin];

	while (queue.length) {
		let curr = queue.shift();

		if (typeof curr === 'object') {
			for (const key in origin) {
				if (typeof curr[key] === 'object') {
					queue.push(curr[key]); // 入队，延后遍历
				} else {
					queue[key] = curr[key]; // 直接拷贝
				}
			}
		}
	}

	return target;
};
