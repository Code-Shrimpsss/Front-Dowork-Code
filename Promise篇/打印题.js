// question
// 1.
//  Promise.resolve()
// 	.then(() => {
// 		console.log(1);
// 	})
// 	.catch(() => {
// 		console.log(2);
// 	})
// 	.then(() => {
// 		console.log(3);
// 	});

// 2.
// Promise.resolve()
// 	.then(() => {
// 		console.log(1);
// 		throw new Error();
// 	})
// 	.catch(() => {
// 		console.log(2);
// 	})
// 	.then(() => {
// 		console.log(3);
// 	});

// 3.
// Promise.resolve()
// 	.then(() => {
// 		console.log(1);
// 		throw new Error();
// 	})
// 	.catch(() => {
// 		console.log(2);
// 	})
// 	.catch(() => {
// 		console.log(3);
// 	});

// 4.
// const promise = new Promise((resolve, reject) => {
// 	console.log(1);
// 	console.log(2);
// });
// promise.then(() => {
// 	console.log(3);
// });
// console.log(4);

// 5.
// const promise = new Promise((resolve, reject) => {
// 	console.log(1);
// 	resolve('success');
// 	console.log(2);
// });
// promise.then(() => {
// 	console.log(3);
// });
// console.log(4);

// 6.
// const promise1 = new Promise((resolve, reject) => {
// 	console.log(0);
// 	resolve(3);
// });
// const promise2 = promise1.then((res) => {
// 	console.log(res);
// });
// console.log(1);
// console.log(2);

// 7.
// const fn = () =>
// 	new Promise((resolve, reject) => {
// 		console.log(1);
// 		resolve('success');
// 	});

// fn().then((res) => {
// 	console.log(res);
// });
// console.log('start');

// 8.
// console.log('start');
// setTimeout(() => {
// 	console.log('time');
// });
// Promise.resolve().then(() => {
// 	console.log('resolve');
// });
// console.log('end');

// 9.
// const promise = new Promise((resolve, reject) => {
// 	console.log(1);
// 	setTimeout(() => {
// 		console.log('timerStart');
// 		resolve('success');
// 		console.log('timerEnd');
// 	}, 0);
// 	console.log(2);
// });
// promise.then((res) => {
// 	console.log(res);
// });
// console.log(4);

// 10.
// setTimeout(() => {
// 	console.log('timer1');
// 	setTimeout(() => {
// 		console.log('timer3');
// 	}, 0);
// }, 0);

// setTimeout(() => {
// 	console.log('timer2');
// }, 0);

// console.log('start');

// 11.
// setTimeout(() => {
// 	console.log('timer1');
// 	Promise.resolve().then(() => {
// 		console.log('promise');
// 	});
// }, 0);

// setTimeout(() => {
// 	console.log('timer2');
// }, 0);

// console.log('start');

// 12.
// Promise.resolve().then(() => {
// 	console.log('promise1');
// 	const timer2 = setTimeout(() => {
// 		console.log('timer2');
// 	}, 0);
// });

// const timer1 = setTimeout(() => {
// 	console.log('timer1');
// 	Promise.resolve().then(() => {
// 		console.log('promise2');
// 	});
// }, 0);

// console.log('start');

// 13.
// const promise1 = new Promise((resolve, reject) => {
// 	setTimeout(() => {
// 		resolve('success');
// 	}, 1000);
// });

// const promise2 = promise1.then((res) => {
// 	// throw new Error('error!!!');
// 	console.log(res);
// });

// console.log('promise1');
// console.log('promise2');

// setTimeout(() => {
// 	console.log('promise1');
// 	console.log('promise2');
// }, 2000);

// 14.
// const promise = new Promise((resolve, reject) => {
// 	resolve('success1');
// 	reject('error');
// 	resolve('success2');
// });
// promise
// 	.then((res) => {
// 		console.log('then: ', res);
// 	})
// 	.catch((err) => {
// 		console.log('catch: ', err);
// 	});

// 15.
// const promise = new Promise((resolve, reject) => {
// 	reject('error');
// 	resolve('success2');
// });
// promise
// 	.then((res) => {
// 		console.log('then1: ', res);
// 	})
// 	.then((res) => {
// 		console.log('then2: ', res);
// 	})
// 	.catch((err) => {
// 		console.log('catch: ', err);
// 	})
// 	.then((res) => {
// 		console.log('then3: ', res);
// 	});

// 16.
// Promise.resolve(1).then(2).then(Promise.resolve(3)).then(console.log);

// boss
// async function async1() {
// 	console.log('async1 start');
// 	await async2();
// 	console.log('async1 end');
// }
// async function async2() {
// 	console.log('async2');
// }
// console.log('script start');

// setTimeout(function () {
// 	console.log('setTimeout');
// }, 0);
// async1();
// new Promise(function (resolve) {
// 	console.log('promise1');
// 	resolve();
// }).then(function () {
// 	console.log('promise2');
// });

// big boss
console.log(1);
setTimeout(() => {
	console.log(2);

	setTimeout(() => {
		console.log(3);
	});

	new Promise((reslove) => {
		console.log(4);
		reslove();
	})
		.then(() => {
			console.log(5);
		})
		.then(console.log(6));
});

new Promise((reslove) => {
	console.log(7);
	reslove();
}).then(() => {
	setTimeout(() => {
		new Promise((reslove) => {
			console.log(8);
		}).then(() => {
			console.log(9);
		});
	});
});

console.log(10);

// ----------------------------------------------------------------
// result
// 1. 1 3
// 2. 1 2 3
// 3. 1 2
// 4. 1 2 4
// 5. 1 2 4 3
// 6. 0 1 2 3
// 7. 1 start success
// 8. start end resolve time
// 9. 1 2 4 timerStart timerEnd success
// 10. start timer1 timer2 timer3
// 11. start timer1 promise timer2
// 12. start promise1 timer1 promise2 timer2
// 13. promise1 promise2 success promise1 promise2
// 14. then:  success1
// 15. catch:  error  then3:  undefined
// 16. 1
