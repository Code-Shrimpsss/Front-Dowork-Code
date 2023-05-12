// 1. 首先将列出每个数字的数量，并将其去重为一个新数组,最后将数组输出为指定格式如: 0124578910 9(数列 个数)
// 注意: 不能使用内置set from sort等函数去重排序

let arr = [
    1, 1, 1,
    2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
    7, 7, 7, 7, 7,
    0, 0, 0, 0,
    1, 1, 1, 1, 1, 1,
    4, 4, 4, 4, 4, 4, 4, 4,
    8, 8, 8,
    0, 0, 0, 0, 0, 0, 0,
    9, 9, 9, 9, 9, 9, 9, 9,
    0, 0, 0,
    10, 10, 10, 10, 10, 10,
    5, 5, 5, 5, 5, 5, 5,
];

let wm = new Map();

; (function (arr, wm, num) {
    // 冒泡排序
    arr.forEach(_ => {
        arr.forEach((_, i) => {
            if (arr[i] > arr[i + 1]) {
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]]
            }
        })
    });

    // Map过滤
    arr.forEach(item => {
        if (wm.has(item)) {
            wm.set(item, '数量: ' + ++num)
            return
        }

        wm.set(item, [num = 1]);
    });

    let output1 = Array.from(wm);
    // let obj = Object.entries(Object.fromEntries(wm));
    console.log('对应次数: ', output1);

    num = 0
    let output2 = output1.reduce((pre, item) => {
        num++;
        return pre + item[0]
    }, '')

    console.log('数列', output2, '长度', num);

})(arr, wm);


