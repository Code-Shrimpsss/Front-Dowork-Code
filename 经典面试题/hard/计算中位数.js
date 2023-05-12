// 给定两个大小为 m 和 n 的有序数组nums1 和nums2。
// 请找出这两个有序数组的中位数。
// 要求算法的时间复杂度为 O(log(m+n))。

// 示例 1：
// nums1 = [1, 3] nums2 = [2]
// 中位数是 2.0
// 示例 2：
// nums1 = [1, 2] nums2 = [3, 4]
// 中位数是(2 + 3) / 2 = 2.5

const findMedianSortedArrays = function (nums1, nums2) {
	const lenN1 = nums1.length;
	const lenN2 = nums2.length;

	const median = Math.ceil((lenN1 + lenN2 + 1) / 2);
	const isOddLen = (lenN1 + lenN2) % 2 === 0;
	const result = new Array(median);

	let i = 0; // pointer for nums1
	let j = 0; // pointer for nums2

	for (let k = 0; k < median; k++) {
		if (i < lenN1 && j < lenN2) {
			// tslint:disable-next-line:prefer-conditional-expression
			if (nums1[i] < nums2[j]) {
				result[i + j] = nums1[i++];
			} else {
				result[i + j] = nums2[j++];
			}
		} else if (i < lenN1) {
			result[i + j] = nums1[i++];
		} else if (j < lenN2) {
			result[i + j] = nums2[j++];
		}
	}

	if (isOddLen) {
		return (result[median - 1] + result[median - 2]) / 2;
	} else {
		return result[median - 1];
	}
};

// let nums1 = [1, 3],
// 	nums2 = [2];

let nums1 = [1, 2],
	nums2 = [3, 4];

console.log(findMedianSortedArrays(nums1, nums2));

function deepCopyByHistory(target) {
	const prev = history.state;
	history.replaceState(target, document.title);
	const res = history.state;
	history.replaceState(prev, document.title);
	return res;
}

async function deepCopyByMessageChannel(target) {
	return new Promise((resolve) => {
		const channel = new MessageChannel();
		channel.port2.onmessage = (ev) => resolve(ev.data);
		channel.port1.postMessage(target);
	}).then((data) => data);
}
