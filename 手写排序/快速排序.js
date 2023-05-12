// 快速排序（Quicksort）是对冒泡排序的一种改进。
// 它的基本思想是：通过一趟排序将要排序的数据分割成独立的两部分，其中一部分的所有数据都比另外一部分的所有数据都要小，然后再按此方法对这两部分数据分别进行快速排序，整个排序过程可以递归进行，以此达到整个数据变成有序序列。

let arr = [9, 4, 10, 3, 1, 1, 0, 10, 8, 3, 9, 9, 4, 10, 10, 9, 9, 9, 1, 0];

function quickSort(arr) {
    if (arr.length == 0) return [];

    let left = [], right = [], center = [], pivot = arr[0];

    arr.forEach((_, i) => {
        if (arr[i] < pivot) left.push(arr[i]);
        else if (arr[i] == pivot) { center.push(arr[i]) }
        else right.push(arr[i]);
    });


    return [...quickSort(left), ...center, ...quickSort(right)];
}

console.log(quickSort(arr));