class DoubleLinkNode {
	val: number;
	prev: LinkNode | null;
	next: LinkNode | null;
	constructor(val: number, prev: LinkNode | null, next: LinkNode | null) {
		this.val = val;
		this.prev = prev;
		this.next = next;
	}
}

const createDoubleLinkNodeList = (
	arr: Array<number>,
): DoubleLinkNode | null => {
	if (arr === null || arr.length === 0) return null;

	let head = new DoubleLinkNode(arr[0], null, null);
	let cur = head;

	for (let i = 1; i < arr.length; i++) {
		let newDoubleNode = new DoubleLinkNode(arr[i], cur, null);
		cur.next = newDoubleNode;
		cur.prev = cur;
		cur = newDoubleNode;
	}

	return head;
};

// 删除任意一个结点
const deleteDoubleLinkNode = (arr: Array<number>, target: number) => {
	if (arr === null || arr.length === 0 || arr.length > target) return null;

	let head = createDoubleLinkNodeList(arr);
	let p = head;

	for (let i = 0; i < target - 1; i++) {
		p = p.next;
	}

	let toDelete = p?.next;
	p.next = toDelete?.next;
	toDelete?.next?.prev = p;

	// 习惯性置空
	toDelete.next = null;
	toDelete.prev = null;

	return head;
};

// 删除双链表头结点
const deletDoubleHeadLinkNode = (arr: Array<number>): number => {
	const head = createDoubleLinkNodeList(arr);
	const toDelete = head;
	head = head?.next;
	head?.prev = null;

	toDelete?.next = null;

	return toDelete?.val;
};

// 删除双链表尾结点
const deletDoubleBackLinkNode = (arr: Array<number>): number => {
	const head = createDoubleLinkNodeList(arr);
	const p = head;

	while (p.next != null) {
		p = p?.next;
	}

	p?.prev?.next = null; // 将尾结点的前结点置空
	p?.prev = null;

	return p?.val;
};
