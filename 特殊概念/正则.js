// old method
// const RE_DATE = /(\d{4})-(\d{2})-(\d{2})/;

let str = 'abcdecatfghi[at]applejklmnopqrsappleattuvwxyzat';

function a() {
    let pattern1 = /apple/g; // 全局匹配
    let pattern2 = /apple/gi; // 忽略大小写
    let pattern3 = /\[at\]/g; // 匹配[at]
    console.log(str.match(pattern1));
    console.log(str.match(pattern3));
}
// a();

function b() {
    let pattern1 = new RegExp("/cat/g"); // 全局匹配
    console.log(str.match(pattern1));
}
b();

// const matchObj = RE_DATE.exec('1999-12-31');
// const year = matchObj[1];
// const month = matchObj[2];
// const day = matchObj[3];
// console.log(year, month, day);

// new method
// 具名组匹配等于为每一组匹配加上了 ID，便于描述匹配的目的
// 如果组的顺序变了，也不用改变匹配后的处理代码
// 如果具名组没有匹配，那么对应的groups对象属性会是undefined
const RE_DATE = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
const matchObj = RE_DATE.exec('1999-12-31');
const year = matchObj.groups.year; // 1999
const month = matchObj.groups.month; // 12
const day = matchObj.groups.day; // 31
console.log(year, month, day);
