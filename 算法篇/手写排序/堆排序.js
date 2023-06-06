function heapSort(array) {
	// 建堆
	for (let i = Math.floor(array.length / 2 - 1); i >= 0; i--) {
		heapify(array, i, array.length);
	}

	// 堆排序
	for (let i = array.length - 1; i > 0; i--) {
		swap(array, 0, i);
		heapify(array, 0, i);
	}

	return array;
}

function heapify(array, i, heapSize) {
	// 找出左右子节点
	let left = 2 * i + 1;
	let right = 2 * i + 2;

	// 找出最大的子节点
	let max = i;
	if (left < heapSize && array[left] > array[max]) max = left;
	if (right < heapSize && array[right] > array[max]) max = right;

	// 如果父节点不是最大值,交换并继续堆化
	if (max != i) {
		swap(array, i, max);
		heapify(array, max, heapSize);
	}
}

function swap(array, i, j) {
	[array[i], array[j]] = [array[j], array[i]];
}


/* 堆排序的基本思路是:
1. 将无序数组构造成一个大顶堆(每一个节点的值都大于等于左右子节点)
2. largest值是堆顶的节点,将它与堆的最后一个节点交换。
3. 重新调整最大堆,继续第二步骤,直到堆大小为1。
其时间复杂度为O(nlogn),空间复杂度为O(1)。 */