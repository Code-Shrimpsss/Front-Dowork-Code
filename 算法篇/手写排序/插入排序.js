// 首先，我们将数组中的数据分为两个区间，已排序区间和未排序区间。初始已排序区间只有一个元素，就是数组的第一个元素。
// 插入算法的核心思想是取未排序区间中的元素，在已排序区间中找到合适的插入位置将其插入，并保证已排序区间数据一直有序。重复这个过程，直到未排序区间中元素为空，算法结束. 插入算法把要排序的数组分成两部分：第一部分包含了这个数组的所有元素，但将最后一个元素除外（让数组多一个空间才有插入的位置），而第二部分就只包含这一个元素（即待插入元素）。在第一部分排序完成后，再将这个最后元素插入到已排好序的第一部分中
// function insertionSort(array = []) {
//     for (let i = 1; i < array.length; i++) {
//         let val = array[i];
//         let j = i - 1;
//         for (; j < array.length; j--) {
//             // 如果
//             if (array[j] > val) array[j + 1] = array[j];
//             else break;
//         }
//         array[j + 1] = val;
//     }
//     return array
// }

// let arr = insertionSort([88, 33, 77, 44, 55, 66, 22]);
// console.log(arr);

// 按照第一种理解方式的实现，即一般的实现
function insertionSort(arr) {
    for (let index = 1; index < arr.length; index++) {
        // 取出一个未排序元素
        let current_ele = arr[index]
        // 已排序元素的最后一个的位置
        let ordered_index = index - 1
        // 前面的元素更大，并且还没遍历完
        while (arr[ordered_index] >= current_ele && ordered_index >= 0) {
            // 使用前面的值覆盖当前的值
            arr[ordered_index + 1] = arr[ordered_index]
            // 向前移动一个位置
            ordered_index--
        }
        // 遍历完成，前面的元素都比当前元素小，把未排序元素赋值进去
        arr[ordered_index + 1] = current_ele
        console.log(arr);
    }
    return arr
}

console.log(insertionSort([88, 33, 77, 44, 55, 66, 22]));

// 按照第二种理解方式的实现
// function insertionSort(arr) {
//     for (let i = 0; i < arr.length; i++) {
//         // 对前面的已排序数组和新选出来的元素执行一趟冒泡排序
//         for (let j = i + 1; j >= 0; j--) {
//             if (arr[j] < arr[j - 1]) {
//                 [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]]
//             }
//         }
//     }
//     return arr
// }

function binaryInsertionSort(array) {
    for (let i = 1; i < array.length; i++) {
        // 未排序部分的第1个
        let current_ele = array[i]
        // 已排序部分的第1个和最后1个
        let left = 0, right = i - 1
        // 先找位置
        while (left <= right) {
            // 不再是从最后一个位置开始向前每个都比较，而是比较中间的元素
            let middle = parseInt((left + right) / 2)
            if (current_ele < array[middle]) right = middle - 1
            else left = middle + 1
        }
        // while结束，已经找到了一个大于或等于当前元素的位置 left
        // 再修改数组：把 left 到 i 之间的元素向后移动一个位置
        for (let j = i - 1; j >= left; j--) array[j + 1] = array[j]
        // 插入当前元素
        array[left] = current_ele
    }
    return array
}