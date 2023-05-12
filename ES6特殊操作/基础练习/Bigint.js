console.log(Math.pow(2, 53) === Math.pow(2, 53) + 1);
console.log(Math.pow(2, 100));
console.log(Math.pow(2, 1024));
let Bint = BigInt(2n);
console.log(typeof Bint); // bigint
console.log(Bint);
console.log(Math.pow(Number(Bint), Number(53n)) === Math.pow(Number(Bint), Number(53n)) + Number(1n));
console.log(Math.pow(2, 53) === Math.pow(2, 53) + 1);