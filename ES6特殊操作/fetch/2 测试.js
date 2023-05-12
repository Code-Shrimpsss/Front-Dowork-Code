
// async function fetchText() {
//     let response = await fetch('http://api.btstu.cn/qqxt/api.php?qq=10001');
//     const response_clone1 = response.clone(); // 复制一个克隆区
//     if (response.status >= 200 && response.status < 300) {
//         const myBlob = await response.blob();
//         const res = await response.body;
//         console.log(response);
//         console.log(res);
//         console.log(myBlob);
//         const objectURL = URL.createObjectURL(myBlob);
//         console.log(objectURL);
//         document.createElement('img').src = objectURL;
//     } else {
//         throw new Error(response.statusText);
//     }
// }

// fetchText();



async function testFatch() {
    const response = await fetch('http://api.btstu.cn/qqxt/api.php?qq=10001');
    const reader = response.body.getReader();
    console.log(reader);
    while (true) {
        const { done, value } = await reader.read();
        if (done) {
            break;
        }
        console.log(`Received ${value.length} bytes`)
    }
}

testFatch();