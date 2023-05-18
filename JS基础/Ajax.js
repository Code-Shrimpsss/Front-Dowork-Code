// Ajax 是 Asynchronous JavaScript and XML 的缩写，它是一种使用 JavaScript 在不刷新页面的情况下与服务器交换数据的技术。

// 创建实例
var xhr = new XMLHttpRequest();

// 使用 XMLHttpRequest 对象的 onreadystatechange 事件处理程序。
// 当请求的状态（readyState）发生变化时，onreadystatechange 事件处理程序将被触发。

// readyState 的可能值包括：
// - 0：请求未初始化（已创建 XMLHttpRequest 实例，但尚未调用 open() 方法）
// - 1：请求已经设置（已调用 open() 方法，但尚未调用 send() 方法）
// - 2：请求已发送（已调用 send() 方法，但尚未收到响应）
// - 3：请求处理中（已收到部分响应数据）
// - 4：请求已完成（已收到所有的响应数据）

xhr.onreadystatechange = function () {
	if (xhr.readyState === 4 && xhr.status === 200) {
		console.log(JSON.parse(xhr.responseText));
	}
};

// 使用 XMLHttpRequest 对象的 open() 方法来设置请求;
// open() 方法接受三个参数：
// - 请求的类型（GET 或 POST）
// - 请求的 URL
// - 请求是否异步（true 表示异步，false 表示同步）
xhr.open('GET', 'https://api.example.com/data', true);

xhr.send();
