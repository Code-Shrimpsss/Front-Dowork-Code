// function* tGenerator(){
//     let index = 0;
//     while(true){
//         yield index++;
//     }
// }

// let t = tGenerator();
// console.log(t.next().value);
// console.log(t.next().value);

// let obj = {a:1, b:2};
function t() {
    let arr = ['aa', 'bb', 3, 4, 5];
    let arr2 = "abcdefg";
    const a = arr2.entries();
    console.log(a.next().value);
    console.log(a.next().value);
    console.log(a.next().value);
    for (const i of arr2) {
        console.log(i);
    }
}

function num() {

    var str = { a: "a", b: "b", c: "c" };
    with (str) {
        console.log(b);
    }

    let num = 99;
    // console.log("1e" == 99);
    console.log(num.toPrecision(1));
    console.log(num.toPrecision(10));

    console.log(Number.isInteger(num)); // 辨别是否是整数
    console.log(Number.isNaN(num)); // 辨别是否是NaN
    console.log(Number.isFinite(num)); // 辨别是否是有限的
    console.log(Number.isFinite(Infinity)); // 辨别是否是有限的
    console.log(Number.isFinite(NaN)); // 辨别是否是有限的
    console.log(Number.isFinite(undefined)); // 辨别是否是有限的
    console.log(Number.isFinite(null)); // 辨别是否是有限的
    console.log(Number.isFinite(true)); // 辨别是否是有限的
    console.log(Number.isFinite(false)); // 辨别是否是有限的
    console.log(Number.isFinite('')); // 辨别是否是有限的
    console.log(Number.isFinite('abc')); // 辨别是否是有限的
    console.log(Number.MAX_SAFE_INTEGER); // 最大安全整数
    console.log(Number.MIN_SAFE_INTEGER); // 最小安全整数
}
// num();


function str() {
    let str = "abc😊defg";
    console.log(str.length);
    console.log(str.charAt(3)); // 获取指定位置的字符
    console.log(str.charCodeAt(3)); // 获取指定位置的字符的unicode码
    console.log(str.codePointAt(3)); // 获取指定位置的字符的unicode码
    console.log(str.includes("b")); // 是否包含某个字符

    console.log(str.charCodeAt(3)); // 获取指定位置的字符编码
    console.log(str.codePointAt(3)); // 获取指定位置的字符编码
    console.log(str.codePointAt(3).toString(16)); // 获取指定位置的字符编码
    console.log(str.codePointAt(3) === 0x64);
    console.log(0x20 === 32);

    console.log(String.fromCharCode(99, 0x64, 0x61, 55357, 56842)); // 根据字符编码获取字符
    console.log(String.fromCharCode(99, 0x64, 0x61, 128522)); // 根据字符编码获取字符
    console.log(String.fromCodePoint(99, 0x64, 0x61, 128522)); // 根据字符编码获取字符
    // console.log(0x74);
    // console.log(0x61);
    // console.log(0x1F60A);

    console.log(String.fromCharCode(0x00c5)); // 根据字符编码获取字符
    console.log(String.fromCodePoint(0x212B));  // 因为0x212B是一个非ASCII字符，所以需要使用fromCodePoint方法
    console.log(String.fromCharCode(0x0042, 0x030A)); // 根据字符编码获取字符

    let a = String.fromCharCode(0x00c5) // 根据字符编码获取字符
    let b = String.fromCodePoint(0x212B)  // 因为0x212B是一个非ASCII字符，所以需要使用fromCodePoint方法
    let c = String.fromCharCode(0x0042, 0x030A)
    console.log(a + b + c);
    console.log(a === b.normalize());
    console.log(a === b.normalize('NFC'));
}
// str();


function strfun() {
    let str = "abc😊defg";
    console.log(str.slice(5, -1));
}

strfun();

var _ = require('lodash');
var obj1 = {
    a: 1,
    b: { f: { g: 1 } },
    c: [1, 2, 3]
};
var obj2 = _.cloneDeep(obj1);
console.log(obj1.b.f === obj2.b.f);// false