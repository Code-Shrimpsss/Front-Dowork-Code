let obj = {
    age: 18,
    age: 19,
    age: 20,
    age: 21,
    age: 22,
    length: 6
}

// const data = Array.from(obj);
const data = Array.from(obj, function (item, index) {
    return {
        name: this.first + item
    }
}, {
    first: '我'
});


console.log(data);