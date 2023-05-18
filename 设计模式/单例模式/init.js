var Singleton = function (name) {
	this.name = name;
	this.instance = null;
};

Singleton.prototype.getName = function () {
	console.log(this.name);
};

Singleton.getInstance = function (name) {
	// 限制单例
	if (!this.instance) {
		this.instance = new Singleton(name);
	}
	return this.instance;
};

var a = Singleton.getInstance('a');
var b = Singleton.getInstance('b');

console.log(a, b, a === b);
