// LRU 的全称是 Least Recently Used: 是一种常用的缓存淘汰策略
// 计算机的缓存容量有限，如果缓存满了就要删除一些内容，给新内容腾位置

class LRUCache {
	constructor(size /**缓存容量 */) {
		this.size = size;
		this.cache = new Map();
	}

	// 查看
	get(key) {
		const hasKey = this.cache.has(key);
		console.log('get: ' + key);
		if (hasKey) {
			// 每次查询时把旧的删除, 新查询的覆盖在最上层
			const val = this.cache.get(key);
			this.cache.delete(key);
			this.cache.set(key, val);
			return val;
		} else return -1;
	}

	// 获取
	set(key, val) {
		const hasKey = this.cache.has(key);
		if (hasKey) {
			this.cache.delete(key);
		}
		this.cache.set(key, val);
		if (this.cache.size > this.size) {
			this.cache.delete(this.cache.keys().next().value);
		}
	}
}

const lru = new LRUCache(3); // 容量

console.log(lru.get('name'));
console.log(lru.get('age'));
console.log(lru.set('age', 22));
const fn = function () {};
console.log(lru.set('name', 'shrimpsss'));
console.log(lru.set(fn, 'functionTest'));
console.log(lru.set({}, 'ObjectTest'));

console.log('size: ', lru.size);
console.log('cache: ', lru.cache);
