// 断言两种写法
let someValue: any = 'this is a string';
let strLength1: number = (<string>someValue).length;
let strLength2: number = (someValue as string).length;

console.log(strLength1, strLength2);

// in 关键字
interface Admin {
	name: string;
	privileges: string[];
}

interface Employee {
	name: string;
	startDate: Date;
}

type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
	console.log('Name: ' + emp.name);
	if ('privileges' in emp) {
		console.log('Privileges: ' + emp.privileges);
	}
	if ('startDate' in emp) {
		console.log('Start Date: ' + emp.startDate);
	}
}

printEmployeeInformation({ name: 'Employee', privileges: ['123', '456'] });

// New Interface

interface IPerson {
	name: string;
	age: number;
}

interface PersonConstructor {
	new (name: string, age: number): IPerson;
}

interface Person {
	[props: string]: string | number;
}

// const objs: Person = {};
// objs.name = 'sss';
// objs.age = 123;

//  ---------------
// function add(a, b) {
//     return a + b;
// }

// 问题: 精准描述改接口函数
// function getPropValue<T>(obj: T, key): key {
// 	return obj[key];
// }

// 答:
function getPropValue<T extends Object, K extends keyof T>(
	obj: T,
	key: K,
): T[K] {
	return obj[key];
}

// ----------------------------------------------------------------
// 模版字面量类型
function func1(str: `#${string}`): typeof str {
	return str;
}

func1('#321');

// ----------------------------------------------------------------
// 类型的装饰
interface IPerson2 {
	readonly name: string;
	age?: number;
}

type tuple2 = [string, number?];

// ----------------------------------------------------------------
// extends ? :

type isTwo<T> = T extends 2 ? true : false;

type res1 = isTwo<1>; // false
type res2 = isTwo<2>; // ture

// ----------------------------------------------------------------
// infer :
// ps: 第一个extends起到了约束的作用,即约束类型只能是数组类型；
type First<Tuple extends unknown[]> = Tuple extends [infer T, ...infer R]
	? T
	: never;

type Four<Array extends string[]> = Array extends [infer T, ...infer R]
	? T
	: never;

type res = First<[]>; // never
type res11 = First<[11, 22, 33]>; // 11

type resM = Four<[]>; // never
type resM11 = Four<['11, 22', ' 33']>; // "11, 22"

// ----------------------------------------------------------------
// 映射类型 :
// keyof T 索引查询（查询索引类型中所有的索引）；
// T[Key] 索引访问（取索引类型某个索引的值）；
// in 用于遍历联合类型；
type MapType<T> = { [Key in keyof T]: [T[Key], T[Key], T[Key], T[Key]] };
type mapRes = MapType<{ name: 123; age: 312 }>;
let mapResult: MapType<{ name: 123; age: 312 }> = {
	name: [123, 123, 123, 123],
	age: [312, 312, 312, 312],
};

// ----------------------------------------------------------------
// 重映射 :
// 利用as运算符改索引，并利用&缩小Key本身的联合类型范围
type HveMapType<T> = {
	[Key in keyof T as `${Key & string}-${Key & string}`]: T[Key];
};

type newHveMapType = HveMapType<{ name: 123 }>;
