function Node(l1, l2){
    let dummy = -1;
    let p = dummy;
    let p1 = l1, p2 = l2;
    while (p1 != null && p2 != null) {
        if (p1.val > p2.val) {
            p.next = p2;
        }
    }
}