let arr = [9, 4, 10, 3, 1, 1, 0, 10, 8, 3, 9, 9, 4, 10, 10, 9, 9, 9, 1, 0];

; (function (arr) {
    console.time("test0")
    function qSort(arr) {
        if (arr.length == 0) {
            return [];
        }
        var left = [];
        var right = [];
        var pivot = arr[0];
        for (var i = 1; i < arr.length; i++) {
            // 注意这里的起始值，因为有一个作为flag了
            if (arr[i] < pivot) {
                left.push(arr[i]);
            } else {
                right.push(arr[i]);
            }
        }
        return [...qSort(left), pivot, ...qSort(right)];
    }
    console.log(qSort(arr));
    console.timeEnd("test0")

})(arr);

// 三路快速排序是快速排序的的一个优化版本
// 将数组分成三段， 即小于基准元素、 等于基准元素和大于基准元素， 这样可以比较高效的处理数组中存在相同元素的情况,其它特征与快速排序基本相同

; (function (arr) {
    function qSort3(arr) {       //三路快排
        if (arr.length == 0) {
            return [];
        }
        var left = [];
        var center = [];
        var right = [];
        var pivot = arr[0];
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] < pivot) {
                left.push(arr[i]);
            } else if (arr[i] == pivot) {
                center.push(arr[i]);
            } else {
                right.push(arr[i]);
            }
        }
        return [...qSort3(left), ...center, ...qSort3(right)];
    }
})(arr);