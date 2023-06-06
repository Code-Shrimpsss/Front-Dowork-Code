// 首先定义
// 被观察者
class Dev {
	constructor() {
		// this.state = 'xxxx'
		//  核心1 -  观察者们
		this.Observers = [];
	}

	// 核心2 - 通知观察者
	attch(call) {
		this.Observers.push(call);
	}

	// 更改状态
	setState(newState) {
		this.state = newState;
		// 核心3 - 每次更改状态时调用通知方法
		this.Observers.forEach((i) => i.update(newState));
	}
}

class watcher {
	constructor(name) {
		this.name = name;
	}
	update(newState) {
		console.log(this.name + '收到通知为: ' + newState);
	}
}

const D = new Dev('leader');
const o1 = new watcher('张三');
const o2 = new watcher('李四');

D.attch(o1);
D.attch(o2);

D.setState('加班');
D.setState('放假');
