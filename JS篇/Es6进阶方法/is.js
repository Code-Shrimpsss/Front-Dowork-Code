Object.defineProperty(Object, 'toIs', {
    value: (x, y) => {
        if (x === y) {
            return x !== 0 || 1 / x === 1 / y;
        } else {
            return x !== x && y !== y;
        }
    }
})

console.log(Object.toIs([], []));
console.log(Object.toIs(Number.NaN, NaN));
console.log(Object.toIs(undefined, undefined));
console.log(Object.toIs(0 / 0, NaN));