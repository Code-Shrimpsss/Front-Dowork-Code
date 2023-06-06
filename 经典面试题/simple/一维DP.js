// 这段代码实现了求一个数组中连续子序列的最大和

function maxSubSum(nums) {
	let maxSum = 0, // 最大和
		currSum = 0; // 当前和

	for (const i of nums) {
		currSum = Math.max(0, currSum + i); // 当前和为当前元素和前面的元素和的最大值和0的最大值

		maxSum = Math.max(currSum, maxSum); // 更新最大和
	}

	return maxSum; // 返回最大和
}

console.log(maxSubSum([123, 45, 88, 67])); // 输出最大和
