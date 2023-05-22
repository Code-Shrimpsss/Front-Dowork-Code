async function testFatch() {
	const response = await fetch('http://api.btstu.cn/qqxt/api.php?qq=10001');
	const reader = response.body.getReader();
	console.log(reader);
	while (true) {
		const { done, value } = await reader.read();
		if (done) {
			break;
		}
		console.log(`Received ${value.length} bytes`);
	}
}

testFatch();
