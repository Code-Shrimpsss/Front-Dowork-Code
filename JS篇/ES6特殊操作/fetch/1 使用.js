// fetch('https://jsonplaceholder.typicode.com/todos/1')
//     // .then(response => response.json())
//     // 异步接收音频数据
//     .then(response => response.json())
//     .then(json => console.log(json))

// 注意: 只有网络错误，或者无法连接时，fetch()才会报错，其他情况都不会报错，而是认为请求成功。

async function getJSON() {
    let url = "http://api.btstu.cn/yan/api.php?charset=utf-8&encode=json"
    try {
        const response = await fetch(url);
        console.log(response);
        console.log(response.type); // 返回请求的类型
        /**
         * basic：普通请求，即同源请求。
            cors：跨域请求。
            error：网络错误，主要用于 Service Worker。
            opaque：如果fetch()请求的type属性设为no-cors，就会返回这个值，详见请求部分。表示发出的是简单的跨域请求，类似<form>表单的那种跨域请求。
            opaqueredirect：如果fetch()请求的redirect属性设为manual，就会返回这个值，详见请求部分
         */

        // console.log(response.status);
        // console.log(response.statusText);
        // console.log(response.json());
        console.log(response.headers);
        // response.headers.append('Content-Type', 'application/json')
        console.log(response.headers.get('Content-Type'));
        const body = await response.text(); // 获取文本数据
        bodyData = JSON.parse(body).text
        document.body.innerHTML = bodyData
        // console.log(response.blob());

    } catch (error) {
        console.log('Request Failed', error);
    }
}
getJSON();