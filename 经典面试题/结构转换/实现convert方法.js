// 实现 convert 方法，把原始list 转换成树形结构，要求尽可能降低时间复杂度
// ps: 这个是对象归类的进阶版

// 以下数据结构中，id 代表部门编号，name 是部门名称，parentId 是父部门编号，为 0 代表一级部门;
// 现在要求实现一个 convert 方法，把原始list 转换成树形结构，parentId 为多少就挂载在该 id 的属性children 数组下;
// 结构如下：

let list = [
	{ id: 1, name: '部门 A', parentId: 0 },
	{ id: 2, name: '部门 B', parentId: 0 },
	{ id: 3, name: '部门 C', parentId: 1 },
	{ id: 4, name: '部门 D', parentId: 1 },
	{ id: 5, name: '部门 E', parentId: 2 },
	{ id: 6, name: '部门 F', parentId: 3 },
	{ id: 7, name: '部门 G', parentId: 2 },
	{ id: 8, name: '部门 H', parentId: 4 },
];

function convert(list) {
	const res = [];
	const map = list.reduce((res, v) => {
		return (res[v.id] = v), res;
	}, {});

	for (const item of list) {
		// 获取根节点
		if (item.parentId === 0) {
			res.push(item);
			continue;
		}

		if (item.parentId in map) {
			const parent = map[item.parentId];
			parent.children = parent.children || [];
			parent.children.push(item);
		}
	}
	return res;
}

const result = convert(list);
console.log('result', result);

// 1. 定义一个空数组 res 用于存储结果,和一个空对象 map 用于快速查找列表中的元素。
// 2. 使用 Array.prototype.reduce() 方法遍历列表,将每个元素添加到 map 对象中,键为元素的 id,值为元素对象。这样就可以通过 id 快速找到 map 中的元素。
// 3. 遍历列表,如果元素的 parentId 为 0,表示它是根节点,将其添加到 res 结果数组。
// 4. 如果元素的 parentId 在 map 中,表示它有父元素,则取出父元素,为父元素添加 children 属性(如果还没有的话),并将该元素推入 children 数组,表示它是父元素的子元素。
// 5. 最后返回 res 结果数组,它包含了树形结构的根节点。
