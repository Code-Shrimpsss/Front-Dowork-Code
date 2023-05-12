// 为这门语言带来了增强的键/值对存储机制
const wm = new WeakMap()
const key1 = { 'id1': 11 }
const key2 = { 'id2': 22 }
const wm2 = new WeakMap([
    [key1, "value1"],
    [key2, "value1"]
])
console.log(wm);
console.log(wm2.get(key1));

const stringKey = new String("key1");
const wm3 = new WeakMap([
    [stringKey, "val1"]
]);
// console.log(wm3.get(stringKey)); // "val1"
// console.log(wm2.has(key1)); // 

// set()方法返回弱映射实例，因此可以把多个操作连缀起来，包括初始化声明
const wm4 = new WeakMap().set(key1, 'typeGo')
// console.log(wm4);
//  =======================================
// 1 声明弱引用
const wm5 = new WeakMap();
// 2 声明container
const container = {
    key: {}
};
// 3 将值key设置为wm5的键 ， 不会触发垃圾机制
wm5.set(container.key, "val");
// 4 只有执行删除了才会触发垃圾回收机制
function removeReference() {
    container.key = null;
}
removeReference();
// console.log(container);


console.log('----------私有变量---------');
// 创建一个弱映射
const wmPiv = new WeakMap();
class User {
    // 构造函数原型属性
    constructor(id) {
        // 创建一个id符号
        this.idProperty = Symbol('id');
        this.setId(id);
    }

    // 保存私有属性
    setPrivate(property, value) {
        // 私有变量
        const privateMembers = wm.get(this) || {};
        privateMembers[property] = value;
        wm.set(this, privateMembers);
    }

    // 获取私有属性
    getPrivate(property) {
        return wm.get(this)[property];
    }

    // 存入id
    setId(id) {
        this.setPrivate(this.idProperty, id);
    }

    // 获取id
    getId() {
        return this.getPrivate(this.idProperty);
    }
}

const user = new User(123);
console.log(user.getId());
user.setId(456);
console.log(user.getId());
console.log(wm.get(user)[user.idProperty]);

console.log('-------相对弱引用-------');
// WeakMap 弱引用的只是键名，而不是键值。键值依然是正常引用
const wm6 = new WeakMap();
let key = {};
let obj = { foo: 1 };
console.log(wm6.set(key, obj));
obj = null;
console.log(wm6.get(key));
// Object {foo: 1}

