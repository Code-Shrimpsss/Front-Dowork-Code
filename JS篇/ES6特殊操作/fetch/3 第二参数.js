async function UserGetAdmin() {
    const url = 'http://api.btstu.cn/yan/api.php?charset=utf-8&encode=json'
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        body: 'foo=bar&lorem=ipsum'
    })
}