// 以下是单例模式的懒汉模式的实现。
// 其中Lazy类的单例并不会在模块引⼊时⾃动初始化。
// 需要⽤户⼿动调⽤getInstace来初始化单例，并且多次调⽤getInstance返回的都是同⼀个实例

class Lazy {
	static instance = null;

	static getInstance() {
		if (!Lazy.instance) {
			Lazy.instance = new Lazy('lazy');
		}

		return Lazy.instance;
	}

	constructor(name) {
		console.log('lazy constructor', name);
		this.name = name;
	}
}

module.exports = { Lazy };
