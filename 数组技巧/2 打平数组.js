let colors = ['red', 'green', 'blue'];
let newColors = ['black', 'brown'];
let moreNewColors = {
	[Symbol.isConcatSpreadable]: true,
	length: 2,
	0: 'pink',
	1: 'can',
};

Symbol.isConcatSpreadable = false;

let color1 = colors.concat('yellow', newColors);
let color2 = colors.concat(moreNewColors);

console.log(color1);
console.log(color2);

let list = [1, 2, 3, 4, 5];

console.log(list.splice(0, 2));
console.log(list.splice(2, 1, 'red', 'green'));
console.log(list);
