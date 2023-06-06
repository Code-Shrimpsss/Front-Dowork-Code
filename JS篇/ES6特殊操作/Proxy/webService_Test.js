// const service = createWebService('http://example.com/data');
// service.then(json => {
//     const employees = JSON.parse(json);
//     console.log('data', employees);
// });

function createWebService(baseUrl) {
    return new Proxy({}, {
        get(target, propKey, receiver) {
            return () => fetch(baseUrl + '/' + propKey)
        }
    })
}