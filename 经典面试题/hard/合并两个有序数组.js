/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function (nums1, m, nums2, n) {
	// 实现思路：双指针，从后往前遍历
	// 1. 定义两个指针，分别指向nums1和nums2的末尾
	// 2. 比较两个指针所指的元素，将较大的元素从nums1末尾往前填补
	// 3. 重复上述步骤，直到nums2中的元素全部填补完毕
	// 4. 如果nums1中的元素全部填补完毕，则nums2中剩余的元素按顺序填补到nums1中
	let p1 = m - 1,
		p2 = n - 1,
		p = m + n - 1;

	while (p1 >= 0 && p2 >= 0) {
		nums1[p--] = nums1[p1] > nums2[p2] ? nums1[p1--] : nums2[p2--];
	}
	console.log(nums1.splice(0, p2 + 1), ...nums2.slice(0, p2 + 1));
	// 如果nums2中还有元素未填补完毕，则将其按顺序填补到nums1中
	nums1.splice(0, p2 + 1, ...nums2.slice(0, p2 + 1));
};
merge([1, 2, 3, 0, 0, 1, 9, 8, 0], 3, [2, 5, 6], 3); // [1,2,2,3,5,6]
