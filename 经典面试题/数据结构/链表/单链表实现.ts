class LinkNode {
	val: number;
	next: LinkNode | null;
	constructor(val: number, next: LinkNode | null) {
		this.val = val;
		this.next = next;
	}
}

const createLinkNode = (arr: Array<number>): LinkNode | null => {
	if (arr === null || arr.length === 0) return null;

	let head = new LinkNode(arr[0], null);
	let cur = head;

	for (let i = 1; i < arr.length; i++) {
		cur.next = new LinkNode(arr[i], null);
		cur = cur.next;
	}

	return head;
};
