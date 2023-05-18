const execFunctionWithCatchError = (exeFn, value, resolve, reject) => {
	try {
		const result = exeFn(value);
		resolve(result);
	} catch (err) {
		reject(err);
	}
};

class MyPromise {
	constructor(executor) {
		this.status = 'pending';
		this.value = undefined;
		this.reason = undefined;
		this.onFulfillFns = [];
		this.onRejectFns = [];

		const resolve = (value) => {
			if (this.status === 'pending') {
				queueMicrotask(() => {
					if (this.status !== 'pending') return;

					this.status = 'fulfilled';
					this.value = value;
					// this.onFulfilled && this.onFulfilled(this.value);
					this.onFulfillFns.forEach((fn) => {
						fn && fn(this.value);
					});
				}, 0);
			}
		};

		const reject = (reason) => {
			if (this.status === 'pending') {
				queueMicrotask(() => {
					if (this.status !== 'pending') return;

					this.status = 'rejected';
					this.reason = reason;
					// this.onRejected && this.onRejected(this.reason);
					this.onRejectFns.forEach((fn) => {
						fn && fn(this.reason);
					});
				}, 0);
			}
		};

		try {
			executor(resolve, reject);
		} catch (error) {
			reject(error);
		}
	}

	then(onFulfilled, onRejected) {
		// 当onRejected为空时 我们手动抛出一个错误
		onRejected =
			onRejected ||
			((err) => {
				throw err;
			});
		// 当onFulfilled为空时 将上一个promise的value传下去
		onFulfilled = onFulfilled || ((value) => value);

		return new MyPromise((resolve, reject) => {
			if (this.status === 'fulfilled' && onFulfilled) {
				execFunctionWithCatchError(onFulfilled, this.value, resolve, reject);
			}

			if (this.status === 'rejected' && onRejected) {
				execFunctionWithCatchError(onRejected, this.reason, resolve, reject);
			}

			if (this.status === 'pending') {
				if (onFulfilled) {
					this.onFulfillFns.push(() => {
						execFunctionWithCatchError(onFulfilled, this.value, resolve, reject);
					});
				}

				if (onRejected) {
					this.onRejectFns.push(() => {
						execFunctionWithCatchError(onRejected, this.reason, resolve, reject);
					});
				}
			}
		});
	}

	static resolve(value) {
		return new MyPromise((resolve) => resolve(value));
	}

	static reject(reason) {
		return new MyPromise((reject) => reject(reason));
	}

	static all(promises) {
		return new MyPromise((resolve, reject) => {
			const values = [];
			promises.forEach((promise) => {
				promise.then(
					(res) => {
						values.push(res);

						if (values.length === promises.length) resolve(values);
					},
					(err) => reject(err),
				);
			});
		});
	}

	static allSettled(promises) {
		return new MyPromise((resolve, reject) => {
			const result = [];
			promises.forEach((promise) => {
				promise.then(
					(res) => {
						result.push({ state: 'resolved', value: res });
						if (result.length === promises.length) {
							resolve(result);
						}
					},
					(err) => {
						result.push({ state: 'rejected', reason: err });
						if (result.length === promises.length) {
							resolve(result);
						}
					},
				);
			});
		});
	}

	static race(promises) {
		return new MyPromise((resolve, reject) => {
			promises.forEach((promise) => {
				promise.then(
					(res) => {
						resolve(res);
					},
					(err) => reject(err),
				);
			});
		});
	}

	static any(promises) {
		return new MyPromise((resolve, reject) => {
			const reasons = [];

			promises.forEach((promise) => {
				promise.then(
					(res) => {
						resolve(res);
					},
					(err) => {
						reasons.push(err);
						if (reasons.length === promises.length) {
							reject(reasons);
						}
					},
				);
			});
		});
	}
}

const p = new MyPromise((resolve, reject) => {
	resolve('resolve');
	reject('reject');
});

p.then(
	(res) => {
		console.log(res);
	},
	(err) => {
		console.log(err);
	},
);

// 构造函数里的逻辑：

// 定义状态
// 定义 resolve、reject 回调
// resolve 执行微任务队列：改变状态、获取value、then传入执行成功回调
// reject 执行微任务队列：改变状态、获取reason、then传入执行失败回调

// then 方法的逻辑：

// 判断 onFulfilled、onRejected 为空给默认值
// 返回 Promise resovle/reject 支持链式调用
// 判断之前的 promise 状态是否确定,确定的话 onFufilled/onRejected 直接执行
// 添加到数组中 push(() => { 执行onFulfilled/onRejected 直接执行代码 })
