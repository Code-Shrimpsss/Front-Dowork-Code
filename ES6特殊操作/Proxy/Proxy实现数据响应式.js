let onWatch = (obj, setBind, getLogger) => {
	let handler = {
		get(target, key, receiver) {
			getLogger(target, key);
			return Reflect.get(target, key, receiver);
		},
		set(target, key, value, receiver) {
			setBind(target, key, value);
			return Reflect.set(target, key, value, receiver);
		},
	};
	return new Proxy(obj, handler);
};

let data = { name: 'xiaomi', age: '33' };

let p = onWatch(
	data,
	(target, key, value) => {
		console.log('set', value);
	},
	(target, key) => {
		console.log('get', target[key]);
	},
);

p.age;
p.age = 12;
