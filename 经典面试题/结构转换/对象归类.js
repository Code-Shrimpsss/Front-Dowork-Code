// [ { value: 1, type: 0 },
// { value: 2, type: 0 },
// { value: 3, type: 1 },
// { value: 4, type: 1 },
// { value: 5, type: 2 },
// { value: 6, type: 2 }, ]
// 输出为指定格式
//   0 => [ { value: 1, type: 0 }, { value: 2, type: 0 } ],
//   1 => [ { value: 3, type: 1 }, { value: 4, type: 1 } ],
//   2 => [ { value: 5, type: 2 }, { value: 6, type: 2 } ]

var arr = [
	{ value: 1, type: 0 },
	{ value: 2, type: 0 },
	{ value: 3, type: 1 },
	{ value: 4, type: 1 },
	{ value: 5, type: 2 },
	{ value: 6, type: 2 },
	{ value: 7, type: 4 },
];

const m = new Map();
arr.map((item) => {
	if (m.has(item.type)) {
		m.set(item.type, [...m.get(item.type), item]);
		return;
	}
	m.set(item.type, [item]);
});

console.log(m);
