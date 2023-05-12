### splice ###

单独讲一下数组中可删除可切割可添加的万能方法splice ，一般情况下其他数组添加删除方法能做到的它也能做到

定义：**`splice()`** 方法通过删除或替换现有元素或者原地添加新的元素来修改数组，并以数组形式返回被修改的内容；**此方法会改变原数组**

**参数规范：**

**`start`**：起始索引；默认为0

- 如果超出了数组的长度，则从数组末尾开始添加内容；
- 如果是负值，则表示从数组末位开始的第几位；
- 如果负数的绝对值大于数组的长度，则表示开始位置为第 0 位；

**`deleteCount `**：要删除的元素数量，默认为0

- 如果省略 `deleteCount` 或者它的值大于等于 `start` 之后的元素的总数，则将 `start` 后面的元素都删除（含第 `start` 位）
- 如果 `deleteCount` 是 0 或者负数，则不移除元素

**`item1，item2`**：添加的元素或者多个元素，从`start` 位置开始

- 如果不指定，则 `splice()` 将只删除数组元素

**返回：** 如果删除了元素，就返回被删除的元素组成的一个数组；如果没有删除元素，则返回空数组

规则有点多，看着是不是有点头大 （￣︶￣）↗　

##### 简单示例： #####

```js
let list = ["orange",  "test", "apple", "test2", 'pear']
console.log(list.splice(2, 2, 44, 99, 55)); // [ "apple", "test2"] // 被删除的元素
console.log(list); // [ 'orange','test', 44 , 99, 55, 'pear' ] // 更改完后的数组
```

简单说一下，由上可见从数组索引为`2`开始，删除了`2`个元素，并添加了 `44` ,` 99`, `55` 这三个元素

### 重写 ###

在重写之我先将其分为三部分，分别是start规范，deleteCount规范与splice核心代码；完整代码放在最后

##### start  #####

第三个参数 `...args` 为展示接收额外参数

```js
Array.prototype.splice2 = function (start, deleteCount, ...args) {
    // 如果没有传start或者负数的绝对值大于数组的长度，则默认从0开始
    if (start === undefined || this.length < -(start)) start = 0;
    // 如果超出了数组的长度，则从数组末尾开始添加内容
    if (start > this.length) start = this.length;
    // 如果是负值，则表示从数组末位开始的第几位
    if (start < 0) start = this.length - start;
    ...
}
```

##### deleteCount #####

```js
Array.prototype.splice2 = function (start, deleteCount, ...args) {
    ...
// 如果省略 `deleteCount` 或者它的值大于等于 `start` 之后的元素的总数，则将 `start` 后面的元素都删除（含第 `start` 位）
    if (deleteCount === undefined || deleteCount > this.length - start) this.length = start
    ...
}
```

##### splice 核心代码 #####

**如果 deleteCount 是 0 或者负数, 则不移除元素, 改为往后添加元素**

```js
 if (deleteCount <= 0) {
        // 遍历范围为要添加的元素的长度
        for (let i = 0; i < args.length; i++) {
            // 3 + 0 + 2 // 5 
            // 这一步相对于换位，将当前要插入的索引上的元素向后移
            this[start + i + args.length - 1] = this[start + i]
            // 再将新的元素放进去
            this[start + i] = args[i]
        }
        // 没有删除元素，返回空数组
        return [] 
 }
```

**如果大于0, 则表示删除原来的元素而从原地添加**

```js
else {
       // 存放被删除元素的数组
        let delArr = [];
       // 遍历范围为要添加的元素的长度
        for (let i = 0; i < args.length; i++) {
            // 先将要删除的元素保存
            delArr[i] = this[start + i]
            // 再将对应索引的元素覆盖
            this[start + i] = args[i]
        }
        // 如果删除了元素，则返回被删除元素的数组。
        return delArr;
}
```

#### 完整代码 ####

```js
Array.prototype.splice2 = function (start, deleteCount, ...args) {
    // start规范
    if (start === undefined || this.length < -(start)) start = 0;
    if (start > this.length) start = this.length;
    if (start < 0) start = this.length - start;
    // deleteCount规范
    if (deleteCount === undefined || deleteCount > this.length - start) this.length = start;
    // splice 核心代码
    if (deleteCount <= 0) {
        for (let i = 0; i < args.length; i++) {
            this[start + i + args.length - 1] = this[start + i];
            this[start + i] = args[i];
        }
        return [];
    } else {
        let delArr = [];
        for (let i = 0; i < args.length; i++) {
            delArr[i] = this[start + i];
            this[start + i] = args[i];
        }
        return delArr;
    }
}
```

