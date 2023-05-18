// 1. 常规使用
new Promise((resolve, reject) => {
	resolve();
})
	.then((res) => res)
	.catch((err) => err)
	.finally((done) => done);

// 2. Promise.all
const promises = [
	new Promise((resolve) => setTimeout(() => resolve('a'), 1000)),
	new Promise((resolve, reject) => setTimeout(() => reject('b'), 1300)),
	new Promise((resolve) => setTimeout(() => resolve('c'), 900)),
];

Promise.all(promises)
	.then((results) => {
		console.log('Promise.all resolved: ' + results);
	})
	.catch((error) => {
		console.log('Promise.all rejected: ' + error);
	});

// 3. Promise.race
Promise.race(promises)
	.then((result) => {
		console.log('Promise.race resolved: ' + result);
	})
	.catch((error) => {
		console.log('Promise.race rejected: ' + error);
	});
