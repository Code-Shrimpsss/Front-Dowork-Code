let str = 'abcdecatf';
let str2 = str.substring(4);
/***
 * 等同于:
 * let str2 = new String(str).substring(4);
 * str = null;
 */
console.log(str2);


let s1 = "klmnopq";
s1.name = 's1'; // new String(s1).name = 's1';
console.log(s1.name); // new String(s1).name;


let n1 = new Number(1);
let n2 = 999;
console.log(n2.toString(2));
console.log(n2.valueOf()); // new Number(n2).valueOf();
console.log(n2.toFixed(5));

console.log(n2.toExponential(1));
console.log(n2.toPrecision(1));
console.log(n2.toPrecision(2));
console.log(n2.toPrecision(3));