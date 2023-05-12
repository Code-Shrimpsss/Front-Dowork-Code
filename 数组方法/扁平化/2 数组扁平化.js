//  常用的数组扁平化 - 解构赋值
let [aa, [bb], cc] = [1, [2, [5], 3], 4];
console.log([aa, bb, cc]);

function flatter(arr) {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            result = result.concat(flatter(arr[i]));
        } else {
            result.push(arr[i]);
        }
    }
    return result;
}
console.log(flatter([1, 2, [3, 4, [5, 6]]]));