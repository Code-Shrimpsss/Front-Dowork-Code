### 最全面的this指向 ###

**我们最常见的浏览器中的 this 默认指向全局对象 window/golbalThis**

##### 各个不同环境的全局对象 #####

- **web:** `window`  `self`  `frames`  `this`
- **node:** `global`
- **worker:**  `self`

**通用: `globalThis`**





### 函数中的this ###

函数中的this分为三个场景

##### 返回this #####

在函数中默认返回的this为外部作用域

```js
function test() {
    return this;
}

console.log(test());
// Window {window: Window, self: Window, document: document, name: '', location: Location, …}
```

##### 调用 #####

函数中的this有一个基准，就是谁调用当前函数，this就指向谁；

```js
function test() {
    return this;
}

console.log(window.test());
// Window {window: Window, self: Window, document: document, name: '', location: Location, …}
```

##### 严格模式 #####

在严格模式中为 `undefined`；无论是函数内部还是外部

```js
'use strict'
function test() {
    return this;
}

console.log(test());
```





### 类中的this ###

首先我们在类中定义静态方法 `test`，它会挂载到构造函数的原型上，即 `Test.prototype`

因此我们可以得论出：**实例对象的 `this` 指向构造函数原型**

```js
class Test {
    test(name) {
        console.log('static: ' + name);
    }
}
const test = new Test();
console.log(test.test("shrimpsss"));
// static: shrimpsss
```

我们再加点东西进去，我们在原先的基础上，在构造器上添加了 `非静态方法 test`

```js
class Test {
    constructor() {
        // 类的非静态方法
        // 在 new 的时候就优先挂载到 this 上
        this.test = function () {
            console.log('none-static');
        }
    }

    test() {
        console.log('static');
    }
}
const test = new Test();
console.log(test.test());
// none-static
```

**why？ 为什么是 `none-static`?** 

##### 解析： #####

是这样的，这道题跟原型链的理论上有很大联系；

首先我们要清楚 **类的非静态方法是在 new 的时候就优先挂载到 this 上的**，**而类的静态方法会**
**挂载到构造函数的原型上，上述例子中静态test的关系就为：`Test.prototype`**

所以说，构造函数会先从本身去查找，如果没有再找到原型链点 `__proto__` ，还是没有，就再找到原型 `prototype` 上，直到找到原型链顶端；

#### 关于 super() ####

我们先来看一个继承的例子

```js
class Father {
    constructor() {
        this.food = "Avocado"
    }
}

class Son extends Father {
    constructor() {
        super();
        this.vg = 'pirge'
    }
}

const s = new Son();
console.log(s);
// Son {food: 'Avocado', vg: 'pirge'}
```

##### 上述代码都发生了什么？ #####

首先我们知道 **this为当前继承的父类** , 父类使用构造器当前定义静态属性时, 子类接收到父类的静态属性

子类若想要定义静态属性, 就必须定义自己的构造器

但是如果只是定义构造器, js会分不清到底this该指向哪里

因此就需要示意 `super()` 继承

通过 `super()` 可以连接父类的this指向

##### 再来看一个问题 #####

为什么`super()` 需要放在顶部? 

因为如果不放在顶部，你在super之前添加当前this的对象属性会格外创建一个内存空间，跟预期的完全不是一个地址 super()过程: -> this