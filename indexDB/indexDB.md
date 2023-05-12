# IndexedDB

IndexedDB 是浏览器提供的一种本地存储方案,它的主要特点是:

1. 存储键值对,并且键值对是有序的。
2. 提供索引功能,可以加快数据查询速度。
3. 支持事务处理,保证数据的一致性。
4. 容量很大,一般来说不少于 50MB,甚至没有上限。
5. 支持二进制数据存储。

它的常用语法包括:

1. 打开数据库:
    ```js
    let dbPromise = indexedDB.open('myDatabase', 1);
    ```
    这个会返回一个 Promise, resolve 时返回 DB 对象。
2. 创建对象仓库(表):
    ```js
    dbPromise.then((db) => {
    	db.createObjectStore('books', { keyPath: 'id' });
    });
    ```
    我们以 id 为主键创建了 books 表。
3. 添加记录:
    ````js
    let tx = db.transaction("books", "readwrite");
    let books = tx.objectStore("books");
    books.add({ id: 1, name: "Harry Potter" });
       ```
    ````
4. 读取记录:
    ```js
    let tx = db.transaction('books');
    let books = tx.objectStore('books');
    let req = books.get(1);
    req.onsuccess = () => {
    	let book = req.result;
    	console.log(book.name); // Harry Potter
    };
    ```
5. 使用索引查询:

    ```js
    books.createIndex('name', 'name');

    let index = books.index('name');
    let req = index.get('Harry Potter');
    req.onsuccess = () => {
    	let book = req.result;
    	console.log(book.id); // 1
    };
    ```

6. 删除记录:
    ```js
    let req = books.delete(1);
    ```
