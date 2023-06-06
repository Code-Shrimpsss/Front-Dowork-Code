function commafy(num) {
	var str = num.toString();
	var count = 0;
	while (str.length > 3) {
		str = str.slice(0, str.length - 3) + ',' + str.slice(str.length - 3);
		count++;
	}
	return str;
}

console.log(commafy(1234567));
