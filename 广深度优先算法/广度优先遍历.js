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

console.log(' wideTraversal', wideTraversal(node));
console.log(' wideTraversal', wideNotTraversal(node));
// code --------------

// simple 递归
function bfs(root) {
	if (root == null) return;

	let queue = [root];

	while (queue.length) {
		let node = queue.shift();
		console.log(node.val);
		if (node.left) queue.push(node.left);
		if (node.right) queue.push(node.right);
	}
}

function wideTraversal(node) {
	/*
	 * @param node{ children?: node | node[]; }: 根节点
	 * @return: nodes: 节点值的数组
	 */

	let nodes = [],
		i = 0;

	if (node != null) {
		nodes.push(node);
		node = nodes[i++];
		let childrens = node.children;
		nodes.push(wideTraversal(childrens));
	}

	return nodes;
}

function wideNotTraversal(node) {
	/*
	 * @param node { children?: node | node[]; }: 根节点
	 * @return: nodes: 节点值的数组
	 */

	let nodes = [],
		index = 0;

	while (node != null) {
		nodes.push(node);
		node = nodes[index++];

		let childrens = node.children;
		for (let i = 0; i < childrens.length; i++) nodes.push(childrens[i]);
	}

	return nodes;
}
