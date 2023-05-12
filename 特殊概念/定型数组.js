// // ArrayBuffer 在分配失败时会抛出错误
// // 声明 ArrayBuffer 则会将所有二进制位初始化为 0
// const buf = new ArrayBuffer(16);
// const buf2 = buf.slice(4, 12);
// // console.log(buf);
// // console.log(buf.byteLength);;
// // console.log(buf2);

// // 写入 ArrayBuffer
// const fullDataView = new DataView(buf);
// console.log(fullDataView); 
// // console.log(fullDataView.byteOffset); 
// // console.log(fullDataView.byteLength); 

// 在内存中分配两个字节并声明一个 DataView 
const buf = new ArrayBuffer(2);
const view = new DataView(buf);

// console.log(view.getUint8(0)); // 0
// console.log(view.getUint8(1)); // 0
// console.log(view.getUint16(0)); // undefined
// console.log(view.getUint16(0, true)); // 0
// console.log(view.getUint8(0, 255)); // 0

// view.setUint8(0, 0x80); // 设置最左边的位等于 1 
// view.setUint8(1, 0x01); // 设置最右边的位等于 1
// // 1000 0000 0000 0001
// console.log(view.getUint16(0));

// console.log(0b101, 0B101 === 5); // 5 true
// console.log(0o456, 0O456 === 302); // 302 true

// console.log(0o91);
// console.log(0b12);

// (function () {
//     'use strict';
//     console.log(0o11);
//     // SyntaxError: Octal literals are not allowed in strict mode.
//     // console.log(011);
// })()

// console.log(Number('0b101'));
// console.log(Number('0o456'));

console.log(isFinite('22'));
console.log(Number.isFinite('22'));

console.log(0.1 + 0.3);
console.log(0.1 + 0.2 - 0.3);
// 5.551115123125783e-17