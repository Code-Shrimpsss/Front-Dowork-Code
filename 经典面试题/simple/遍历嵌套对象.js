// 遍历嵌套对象，每个对象有 key、value、children（数组），把每层的key、value打印出来。

const obj = {
	key: 'value1',
	value: 'first',
	children: [
		{
			key: 'value2',
			value: 'second',
			children: [
				{
					key: 'value3',
					value: 'trans',
				},
			],
		},
	],
};

function traverse(obj) {
	if (obj.length === 0 || obj === undefined) return obj;
	console.log(obj.key, obj.value);

	if (obj.children) {
		for (let i = 0; i < obj.children.length; i++) {
			traverse(obj.children[i]);
		}
	}
}

traverse(obj);
