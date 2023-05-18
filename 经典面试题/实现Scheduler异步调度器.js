// JS 实现一个带并发限制的异度调度器 Scheduler，保证同时运行的任务最多有两个。
// 完善下面代码中的 Scheduler 类，使得以下程序能正确输出。
class Scheduler {
	constructor() {
		this.waitTasks = [];
		this.excutingTasks = [];
		this.maxExcutingNum = 2;
	}

	add(promiseMaker) {
		if (this.excutingTasks.length < this.maxExcutingNum) {
			this.run(promiseMaker);
		} else {
			this.waitTasks.push(promiseMaker);
		}
	}

	run(promiseMaker) {
		let _len = this.excutingTasks.push(promiseMaker);
		console.log('_len', _len);

		const index = _len - 1;

		promiseMaker().then(() => {
			this.excutingTasks.splice(index, 1);

			if (this.waitTasks.length > 0) {
				this.run(this.waitTasks.shift());
			}
		});
	}
}

const scheduler = new Scheduler();

const timeout = (time) =>
	new Promise((resolve) => {
		setTimeout(resolve, time);
	});

const addTask = (time, order) => {
	scheduler.add(() => timeout(time).then(() => console.log(order)));
};

addTask(1000, '1');
addTask(500, '2');
addTask(300, '3');
addTask(400, '4');
// output：2 3 1 4
// 一开始，1，2两个任务进入队列。
// 500ms 时，2完成，输出2，任务3入队。
// 800ms 时，3完成，输出3，任务4入队。
// 1000ms 时，1完成，输出1。
