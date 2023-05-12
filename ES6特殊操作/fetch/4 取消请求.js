async function Fn() {
    console.time("发送请求");
    let controller = new AbortController();
    const url = "http://api.btstu.cn/qqxt/api.php?qq=10001"
    setTimeout(() => controller.abort(), 1000);
    try {
        let response = await fetch(url, {
            signal: controller.signal
        });
    } catch (err) {
        if (err.name == 'AbortError') {
            console.log('Aborted!');
        } else {
            throw err;
        }
    }

    console.timeEnd('发送请求');
}

Fn()