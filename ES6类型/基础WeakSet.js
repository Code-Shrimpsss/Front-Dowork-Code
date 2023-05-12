const ws = new WeakSet();
console.log(ws);
// ws.add(1); // TypeError: 1 is not an object
ws.add({});
console.log(ws);

// const ws2 = new WeakSet({a:[1, 2, 3]});
const ws2 = new WeakSet([{a: [1, 2, 3]}, {b: [4, 5, 6]}]);
let c = { c : [7, 8, 9] };
ws2.add(c);
console.log(ws2.constructor);
ws2.delete(c);
// console.log(ws2.has());
console.log(ws2);
