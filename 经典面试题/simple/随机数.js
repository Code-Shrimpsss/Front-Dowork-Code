// 用随机数实现一个热榜，要求返回的三个排名编号不重复；

function random_pick(list, target = 3) {
	/**
	 * @param {number[]} list - 数据
	 * @param {number} target - 获取的条数
	 */

	// 1. 保存热榜
	let hot = [];
	// 2. 保存热榜的索引
	for (let index = 0; index < list.length; index++) {
		// 3. 如果热榜采集完，则直接返回
		if (hot.length >= target) return _hots(hot);
		// 4. 每次随机取出一个数
		let r = Math.floor(Math.random() * list.length);
		// 5. 如果随机数不在热榜里，则加入热榜
		if (hot.indexOf(r) == -1) {
			hot.push(r);
		}
	}
	// 热榜过滤函数
	function _hots(params) {
		return params.map((item) => {
			return list[item];
		});
	}
}

// function random_pick(list, target = 3) {
// 	const hot = new Set();
// 	function* _random_pick() {
// 		if (hot.size >= target) return;
// 		let r = Math.floor(Math.random() * list.length);
// 		if (!hot.has(r)) {
// 			hot.add(r);
// 			yield list[r];
// 			yield* _random_pick();
// 		}
// 	}
// 	return _random_pick();
// }

let r = random_pick([22, 33, 44, 55, 66, 77, 88]);
console.log(r);
