const fs = require('node:fs');
const stream = fs.createReadStream('bigfile.txt');
const highWaterMark = 1024 * 1024 * 10; // 10MB
let bytesWritten = 0;

stream.on('data', (chunk) => {
	bytesWritten += chunk.length;
	process.stdout.write(chunk);

	if (bytesWritten > highWaterMark) {
		stream.pause(); // 暂停读取
		fs.writeFile('tmp.txt', chunk, () => {
			// 写入临时文件
			stream.resume(); // 恢复读取
		});
		bytesWritten = 0;
	}
});

stream.on('end', () => {
	console.log('File read completed!');
});

/* 
主要逻辑如下:
1. 使用fs.createReadStream()逐步读取bigfile.txt文件,而不是直接读取到内存。
2. 设置highWaterMark高水位线为10MB,当读取的数据量超过这个阈值时,暂停读取并将数据写入临时文件tmp.txt。
3. 写入完毕后恢复读取,如此循环,避免占用大量内存。
4. 最后读取结束后输出提示,并可以继续处理临时文件中的数据。
5. 通过这种流式读取和暂停机制,可以处理任意大小的文件,不会造成内存溢出,这正是Node.js适用于处理大文件和I/O密集型应用的原因。
*/
