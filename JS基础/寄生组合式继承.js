// 父类: 公共属性和方法
function Person(name) {
	this.name = name;
}

// 父类定义一个吃的方法
Person.prototype.eating = function () {
	console.log(this.name + ' is eating');
};

function Student(name, sno) {
	Person.call(this, name);
	this.sno = sno;
}

Student.prototype = Object.create(Person.prototype);

Object.defineProperty(Student.prototype, 'constructor', {
	enumerable: true,
	configurable: true,
	writable: true,
	value: Student,
});

Student.prototype.studying = function () {
	console.log(this.name + ' is studying');
};

// ------------------------------ Use ----------------------------------
const s = new Student('shrimpsss');
s.eating();
s.studying();
