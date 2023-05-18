var ProxySingleton = (function () {
	var _instance = null;

	return function (Func) {
		if (!_instance) {
			_instance = new Func();
		}
		return _instance;
	};
})();

function A() {
	this.name = Math.random();
}

function B() {
	this.name = Math.random();
}

var a = new ProxySingleton(A);
var b = new ProxySingleton(B);

console.log(a, b, a === b);
