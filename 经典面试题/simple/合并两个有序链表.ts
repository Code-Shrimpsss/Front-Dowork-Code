interface ListNode {
	val: string;
	next: ListNode | null;
}

function mergeTwoLists(
	l1: ListNode | null,
	l2: ListNode | null,
): ListNode | null {
	let dummy = new ListNode(-1),
		p = dummy,
		p1 = l1,
		p2 = l2;

	while (p1 !== null && p2 !== null) {
		if (p1.val > p2.val) {
			p.next = p2;
			p2 = p2.next;
		} else {
			p.next = p1;
			p1 = p1.next;
		}
		p = p.next;
	}

	p.next = p1 !== null ? p1 : p2;

	return dummy.next;
}
