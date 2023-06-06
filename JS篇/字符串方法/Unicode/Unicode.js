// console.log("\uD842\uDFB7");
// console.log("\u20BB7");
// // \u后面跟上超过0xFFFF的数值（比如\u20BB7）
// // JavaScript 会理解成\u20BB+7
// console.log("\u20BB+7");
// console.log("\u{20BB7}");
// // "𠮷"
// console.log("\u{41}\u{42}\u{43}");
// // "ABC"
// let hello = 123;
// console.log(hell\u{6F}); // 123
// console.log('\u{1F680}' === '\uD83D\uDE80'); // true

// console.log("\uD834\uDF06");


// let text = String.fromCodePoint(0x20B98);
// for (let i = 0; i < text.length; i++) {
//     console.log(text[i]);
// }
// // " "
// // " "
// for (let i of text) {
//     console.log(i);
// }
// // "𠮘"

// console.log("\u4e2d");

// console.log(eval("'\u2029'"));


console.log(JSON.stringify('\u{D834}'));  // ""\\uD834""
console.log(JSON.stringify('\uD834\uDf06'));  // ""\\uD834""
console.log(JSON.stringify('\uDF06\uD834'));// ""\\udf06\\ud834""