function shellSort(arr) {
    for (let gap = 1; gap > 0; gap = Math.floor(gap / 2)) {
        // 中层和内层是插入排序
        // 普通插入排序从第1个元素开始，这里分组了，要看每一组的第1个元素
        // 共分成了 gap 组，第一组的第1个元素索引为 gap
        // 第一组元素索引为 0, 0+gap, 0+2*gap，...，第二组元素索引为 1, 1+gap, 2+2*gap
        for (let i = gap; i < arr.length; i++) {
            let current_ele = arr[i];
            let ordered_index = i - gap;
            while (ordered_index >= 0 && arr[ordered_index] > current_ele) {
                arr[ordered_index + gap] = arr[ordered_index]
                ordered_index -= gap
            }
            arr[ordered_index + gap] = current_ele
        }
    }
    return arr
}
console.time();
console.log(shellSort([8, 9, 1, 7, 2, 3, 5, 4, 6, 0]));
console.timeEnd();