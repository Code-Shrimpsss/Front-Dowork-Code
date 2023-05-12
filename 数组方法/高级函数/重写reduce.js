Array.prototype.myReduce = function (cb, initial) {
    let _arr = this;
    let _len = _arr.length;
    let _args = arguments[2] || window;
    let _item;

    for (let index = 0; index < _len; index++) {
        _item = deepClone(_arr[index]);
        initial = cb.apply(_args, [initial, _item, index, _arr]);
    }

    return initial;
}


let oldArr = [{ id: 1, name: 'zhangs', mobile: 110 }, { id: 2, name: 'lisi', mobile: 110 }, { id: 3, name: 'wanwu', mobile: 110 }, { id: 3, name: 'zhaoliu', mobile: 120 },];
let oldArr1 = [{ id: 10, name: 'Mater', mobile: 330 }]
let newArr = [{ id: 1, name: 'zhangs', mobile: 110 }, { id: 2, name: 'lisi', mobile: 110 }, { id: 3, name: 'wanwu', mobile: 110 }, { id: 3, name: 'zhaoliu', mobile: 120 },];
let newArr1 = [{ id: 10, name: 'Mater', mobile: 330 }]

// arr.reduce(function (prev, item, index, arr) {
//     console.log(prev, item);
//     return prev += item.mobile;
// }, 1000, arr1)
// console.log("----------------");
// arr.myReduce(function (prev, item, index, arr) {
//     console.log(prev, item);
//     return prev += item.mobile;
// }, 2000, arr1)


Array.prototype.myReduceRight = function (cb, initial) {
    let _arr = this;
    let _len = _arr.length;
    let _args = arguments[2] || window;
    let _item;

    for (let index = _len - 1; index >= 0; index--) {
        _item = deepClone(_arr[index]);
        initial = cb.apply(_args, [initial, _item, index, _arr]);
    }
    return initial;
}


let oldVal = oldArr.reduceRight(function (next, item, index, arr) {
    console.log(item);
    item.mobile >= 110 && next.push(item);
    return next
}, oldArr1)
console.log(oldVal);
console.log("----------------");

let newVal = newArr.myReduceRight(function (next, item, index, arr) {
    console.log(item);
    item.mobile >= 110 && next.push(item);
    return next
}, newArr1)
console.log(newVal);
