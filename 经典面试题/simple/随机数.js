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

// --------------------------- Use -------------------------------------

// 场景1： 我们假如要做抽奖活动，保证绝对的公平，把人名放在数组中，怎么去做

// 洗牌算法
// function shuffle(array) {
// 	for (let i = array.length - 1; i > 0; i--) {
// 		let j = Math.floor(Math.random() * (i + 1));
// 		[array[i], array[j]] = [array[j], array[i]];
// 	}
// }

// const names = ['Jack', 'Tom', 'Lucy'];
// shuffle(names);
// console.log(names);

// 场景2：人数比较多怎么办？
// 先将所有人名放入一个大数组中，然后随机选择若干人加入到抽奖人员数组中进行抽奖。
const allNames = ['Jack', 'Tom', 'Lucy', 'Lily', 'Rose'];
const drawNames = [];
const drawCount = 2; // 设定抽奖人数

function shuffle(drawNames, drawCount) {
	while (drawNames.length < drawCount) {
		const index = Math.floor(Math.random() * allNames.length);
		drawNames.push(allNames[index]);
		allNames.splice(index, 1);
	}
}

shuffle(drawNames, drawCount);

console.log(drawNames);
