// 默认 this 指向全局对象 window/golbalThis

// 各个不同环境的全局对象
// web: window  self  frames  this
// node: global
// worker: self

// 通用: globalThis

// 严格模式下直接返回 undefined

// 'use strict'
// function test() {
//     return this;
// }

// console.log(test());

// console.log(window.test());

// 类中的this指向
// class Test {
//     constructor() {
//         // 类的非静态方法
//         // 在 new 的时候就优先挂载到 this 上
//         this.test = function () {
//             console.log('none-static');
//         }
//     }

//     // 类的静态方法
//     // 挂载到构造函数的原型上: Test.prototype
//     test() {
//         console.log('static');
//     }
// }
// // 原型链: this.test -> __proto__ -> Test.prototype
// const test = new Test();
// console.log(test);

// Object.create(原型)

// super() 生成父类上的 constructor

// class Father {
//     constructor() {
//         this.food = "Avocado"
//     }
// }

// class Son extends Father {
//     constructor() {
//         super();
//         this.vg = 'pirge'
//         // Son {food: 'Avocado', vg: 'pirge'}
//     }
// }

// const s = new Son();
// console.log(s);

// 箭头函数的this为外层作用域 () => {}
// 普通函数的this为window function {}

// 对象的this指向
// 内部的this原则是找最近的引用

// var obj = {
//     a: 1,
//     b: 2,
//     test: function () {
//         function f() {
//             console.log(this); // window
//         }
//         f();
//     }
// }

// var obj1 = {
//     test: function () {
//         console.log(this.a + this.b);
//     }
// }

// obj1.a = 10;
// obj1.b = 20;
// console.log(obj1);
// // obj1.test();

// // obj2 -> __proto__ -> prototype
// var obj2 = Object.create({
//     test: function () {
//         console.log(this.a + this.b);
//     }
// })

// obj2.a = 10;
// obj2.b = 20;
// // obj2.prototype.c = 30;

// console.log(obj2);

// 对象中的get的this指向

// new构造的过程 new this -> {} -> 添加this上挂载的属性到 {} 中 -> return this

class Father {
    constructor() {
        // 构造函数优先查询当前构造器有没有对应属性
        // 这层是直接执行 this.eat 不执行 eat()
        this.eat = this.eat.bind(this);
    }
    get() {
        return 'apple';
    }
    eat() {
        console.log("Eat: ", this.get());
    }
}

class Son {
    get() {
        return 'origen';
    }
}


const f = new Father();
const s = new Son();
// s.call(f)
f.eat()
s.eat = f.eat;
s.eat()

