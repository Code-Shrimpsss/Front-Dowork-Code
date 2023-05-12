function asyncFn() {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve('hello');
		}, 2000);
	});
}

function* dispatcher() {
	console.log('before');
	const result = yield asyncFn();
	console.log('result', result);
}

const generator = dispatcher();

function runAsyncDispatcher() {
	let workInProgressTask = generator.next();

	if (workInProgressTask.done) return;
	else {
		if (workInProgressTask.value instanceof Promise) {
			workInProgressTask.value.then(() => {
				workInProgressTask = generator.next();
				runAsyncDispatcher();
			});
		}
	}
}

runAsyncDispatcher();
