// 1. hashMap解法，空间O(n), 时间O(1)
/**
 * @param {string} astr
 * @return {boolean}
 */
var isUnique = function (astr) {
	const maps = new Map();

	for (let i = 0; i < astr.length; i++) {
		if (maps.has(astr[i]) && maps.get(astr[i]) != i) {
			return false;
		}
		maps.set(astr[i], i);
	}

	return true;
};

console.log(isUnique('leetcode')); // false
console.log(isUnique('abc'));
console.log(isUnique('aa'));
