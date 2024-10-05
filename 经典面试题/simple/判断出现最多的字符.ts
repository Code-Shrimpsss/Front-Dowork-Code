const StringCounter = (str: string): string => {
	const MAP = new Map();
	let max = 0,
		maxValue = '';

	for (let char of str) {
		let count = MAP.get(char) || 0;
		MAP.set(char, count + 1);

		if (count > max) {
			max = count;
			maxValue = char;
		}
	}

	return maxValue;
};

console.time('str_test');
const str = 'absdasfalsdaneasdlangkjlkjknenalkjjen';
console.log('Max count:', StringCounter(str));
console.timeEnd('str_test');
