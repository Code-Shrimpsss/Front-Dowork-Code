Array.prototype.mySome = function (cb) {
    let _arr = this;
    let _len = _arr.length;
    let _arg2 = argumnets[1] || window;
    let _res = false;

    for (let index = 0; index < _len; index++) {
        if (cb.apply(_arg2, [_arr[index], index, _arr])) {
            _res = true;
            break;
        }
    }
    return _res;
}


let arr = [{ id: 1, name: 'zhangs', mobile: 110 }, { id: 2, name: 'lisi', mobile: 110 }, { id: 3, name: 'wanwu', mobile: 110 }, { id: 3, name: 'wanwu', mobile: 120 },];
let arr1 = [1, 2, 3]

const oldF = arr.some(function (item, index, arr) {
    return item.mobile == 120;
}, arr1)

const newF = arr.some(function (item, index, arr) {
    return item.mobile == 120;
}, arr1)

console.log(oldF);
console.log(newF);