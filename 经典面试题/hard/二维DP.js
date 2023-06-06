// 求矩阵从左上角到右下角的最短路径

// 参数：row-矩阵行数，col-矩阵列数
// 返回值：最短路径长度

function getShortestPath(row, col) {
	let m = row,
		n = col;
	let dp = new Array(n).fill(0); // 初始化dp数组

	for (let i = 0; i < m; i++) {
		for (let j = 0; j < n; j++) {
			if (i == 0 && j == 0) dp[j] = matrix[i][j]; // 左上角
			else if (i == 0) dp[j] = dp[j - 1] + matrix[i][j]; // 第一行
			else if (j == 0) dp[j] = dp[j] + matrix[i][j]; // 第一列
			else dp[j] = Math.min(dp[j - 1], dp[j]) + matrix[i][j]; // 其他情况
		}
	}

	return dp[n - 1]; // 返回最短路径长度
}
