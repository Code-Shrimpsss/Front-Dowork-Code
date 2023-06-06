const http = require('node:http');
const fs = require('node:fs');

// 获取命令行参数
const args = require('minimist')(process.argv.slice(2));
const post = args.post || 3000;
// 通过 “--post” 使用
console.log(post);

// good - html test
const html = fs.readFileSync('./1_html.html');

const server = http.createServer((req, res) => {
	const base = '/';
	const path = req.url === base ? '/home' : req.url;

	if (path === '/') {
		res.writeHead(302, { Location: 'home' });
		return res.end();
	}

	if (path === '/old') {
		path = '/new';
	}

	if (path.endsWith('/')) {
		res.writeHead(302, { Location: path + '/' });
		return res.end();
	}

	if (path.endsWith('/')) {
		fs.readdir(base, (err, files) => {
			console.log(' err - files ', err, files);
		});
	}

	if (!fs.existsSync(base + path)) {
		res.statusCode = 404;
		return res.end('404 Not Found [G]');
	}

	// 性能优化测试
	fs.createReadStream(base + path).pipe(res);

	return res.end(html);
});

server.listen(3333, () => {
	console.log(' listening on  http://localhost:3333 🎏');
});
