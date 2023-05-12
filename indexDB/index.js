// 建立 DB
const db = window.indexedDB.open('shrimpsss');
let connection; // 数据库连接对象

// 建立数据库
db.onupgradeneeded = (e) => {
	connection = e.target.result;
	connection.createObjectStore('user', {
		keyPath: 'user_id',
	});
};

// 成功的回调
db.onsuccess = (e) => {
	connection = e.target.result;
};

// 失败的回调
db.onerror = (e) => {
	connection = e.target.result;
};

// 模拟数据请求操作
setTimeout(() => {
	const tx = connection.transaction('user', 'readwrite');
	const store = tx.objectStore('user');

	// 新增
	// const addReq = store.add({
	//     user_id: '1',
	//     user_name: "vito"
	// });

	// addReq.onsuccess = () => {
	//     console.log('add success')
	// }

	// 修改
	// const putReq = store.put({
	//             user_id: '1',
	//     user_name: "vito-1"
	// })

	//     putReq.onsuccess = () => {
	//     console.log('add success')
	// }

	// 获取
	// const getReq = store.get('1');
	//     getReq.onsuccess = (e) => {
	//     console.log('get success', e.target.result)
	// }

	// 删除
	const delReq = store.delete('1');
	delReq.onsuccess = (e) => {
		console.log('delete success');
	};
}, 1000);


