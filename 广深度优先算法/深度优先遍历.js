const root = {
	val: 1,
	left: {
		val: 2,
		left: { val: 4, left: null, right: null },
		right: { val: 5, left: null, right: null },
	},
	right: {
		val: 3,
		left: { val: 6, left: null, right: null },
		right: { val: 7, left: null, right: null },
	},
};

const node = {
	val: 1,
	children: [
		{
			val: 2,
			children: [
				{ val: 4, children: [] },
				{ val: 5, children: [] },
			],
		},
		{
			val: 3,
			children: [
				{ val: 6, children: [] },
				{ val: 7, children: [] },
			],
		},
	],
};

console.log(' deepTraversal', deepTraversal(node));
console.log(' deepNotTraversal', deepNotTraversal(node));

// code --------------

// simple 递归
function dfs(root) {
	if (!root) return;
	console.log(root.val);
	dfs(root.left);
	dfs(root.right);
}

// deep 递归
function deepTraversal(node) {
	/*
	 * @param node { children?: node | node[]; }: 根结点
	 * @return: nodes: 结点值的数组
	 */

	const nodes = [];
	if (node != null) {
		nodes.push(node);

		let children = node.children; // 2

		for (let i = 0; i < children.length; i++) deepTraversal(children[i]); // 3

		return nodes; // 4
	}
}

/* 

*/

// deep 非递归
function deepNotTraversal(node) {
	/*
	 * @param node { children?: node | node[]; } : 根结点
	 * @return: nodes: 结点值的数组
	 */

	let nodes = [];
	if (node != null) {
		let stack = [];
		stack.push(node); // 1

		while (stack.length != 0) {
			let items = stack.pop();
			nodes.push(items); // 2

			let children = items.children;
			for (let i = children.length - 1; i >= 0; i--) {
				// 3
				stack.push(children[i]);
			}
		}
	}

	return nodes;
}

/* 
这个算法使用栈实现了深度优先遍历,主要步骤是:
1. 根结点入栈
2. 遍历栈,出栈一个结点并访问
3. 将该结点的子结点以倒序入栈
4. 重复步骤2和3,直到栈为空

使用栈的特点是“后进先出”,所以子结点是以倒序入栈的,在出栈时会先访问最近的子结点。
这实现了与递归版本相同的深度优先搜索顺序。

相比于递归版本,这个非递归版本的优点是:
1. 不会存在栈溢出的问题,更加节省调用栈空间。
2. 更符合迭代思想,易于理解。

所以在实际项目中,除了最简单的场景,非递归版本的深度优先遍历往往更为实用
*/
