// 编写一个方法，用于获取浏览器地址栏中的查询参数并将参数转换为对象类型

function getQueryParams(url) {
	let params = {};
	if (url.indexOf('?') === -1) return params;

	const paramsStr = url.slice(url.indexOf('?') + 1);
	const paramsArr = paramsStr.split('&');

	paramsArr.forEach((param) => {
		const [key, value] = param.split('=');
		// decodeURIComponent 解码
		params[key] = decodeURIComponent(value);
	});

	return params;
}

let url = 'https://example.com/search?keyword=hello&page=2';
console.log(getQueryParams(url));
