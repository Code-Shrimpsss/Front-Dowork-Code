// TODO: 本篇为总结篇
// TODO: 每次语法都对应一个例子

/* 
类型体操顺口溜

模式匹配做提取，重新构造做变换。

递归复用做循环，数组长度做计数。

联合分散可简化，特殊特性要记清。

基础扎实套路熟，类型体操可通关。
*/

// 1. 模式匹配做提取
// 就像字符串可以通过正则提取子串一样，
// TypeScript 的类型也可以通过匹配一个模式类型来提取部分类型到 infer 声明的局部变量中返回

type GetReturnTypes<Func extends Function> = Func extends (
	...args: any[]
) => infer ReturnType
	? ReturnType
	: never;

type FunReturnResult = GetReturnTypes<(name: string) => 'dong'>;

// 2. 重新构造做变换
// TypeScript 类型系统可以通过 type 声明类型变量，通过 infer 声明局部变量，
// 类型参数在类型编程中也相当于局部变量，但是它们都不能做修改，
// 想要对类型做变换只能构造一个新的类型，在构造的过程中做过滤和转换。

// ps: 在字符串、数组、函数、索引等类型都有很多应用，特别是索引类型。

// 👇比如把对象每个键值转换为大写:
type UppercaseKeys<Obj extends Record<string, any>> = {
	[Key in keyof Obj as Uppercase<Key & string>]: Obj[Key];
};

type UppercaseKeysResult = UppercaseKeys<{ name: 'bbc'; age: 88 }>;

// 3. 递归复用做循环
// 在 TypeScript 类型编程中，遇到数量不确定问题时，
// 就要条件反射的想到递归，每次只处理一个类型，
// 剩下的放到下次递归，直到满足结束条件，就处理完了所有的类型。

// 👇比如把长度不确定的字符串转为联合类型：
type StringToUnions<Str extends string> =
	Str extends `${infer First}${infer Rest}`
		? StringToUnions<Rest> | First
		: never;

type StringToUnionsResult = StringToUnions<'qweqwe123'>;

// 4. 数组长度做计数
// TypeScript 类型系统没有加减乘除运算符，
// 但是可以构造不同的数组再取 length 来得到相应的结果。
// 这样就把数值运算转为了数组类型的构造和提取。

type BuildArrays<
	Length extends number,
	Ele = unknown,
	Arr extends unknown[] = [],
> = Arr['length'] extends Length ? Arr : BuildArray<Length, Ele, [...Arr, Ele]>;

type Subtracts<
	Num1 extends number,
	Num2 extends number,
> = BuildArray<Num1> extends [...arr1: BuildArray<Num2>, ...arr2: infer Rest]
	? Rest['length']
	: never;

type SubtractResults = Subtracts<33, 12>;

// 5. 联合分散可简化
// TypeScript 对联合类型做了特殊处理，
// 当遇到字符串类型或者作为类型参数出现在条件类型左边的时候，
// 会分散成单个的类型传入做计算，最后把计算结果合并为联合类型。

// 👇比如联合类型的判断是这样的：

type IsUnions<A, B = A> = A extends A
	? [B] extends [A]
		? false
		: true
	: never;

type IsUnionsResult = IsUnions<'a' | 'b' | 'c'>;

// 联合类型做为类型参数直接出现在条件类型左边的时候就会触发 distributive 特性，q而不是直接出现在左边的时候不会。

// 所以， A 是单个类型、B 是整个联合类型。通过比较 A 和 B 来判断联合类型。

// 6.特殊特性要记清
// 会了提取、构造、递归、数组长度计数、联合类型分散这 5 个套路以后，各种类型体操都能写；
// 但是有一些特殊类型的判断需要根据它的特性来，所以要重点记一下这些特性。

// 👇比如 any 和任何类型的交叉都为 any，可以用来判断 any 类型：
type IsAnyType<T> = 'dong' extends 'guang' & T ? true : false;

// 👇比如索引一般是 string，而可索引签名不是，可以根据这个来过滤掉可索引签名：
type RemoveIndexSignature<Obj extends Record<string, any>> = {
	[Key in keyof Obj as Key extends `${infer Str}` ? Str : never]: Obj[Key];
};

// TODO: NEW INPUT
// 泛型类型接口源码要注意返回值
