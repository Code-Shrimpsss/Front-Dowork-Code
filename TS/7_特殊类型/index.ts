// TypeScript 类型系统中有些类型比较特殊。
// 比如 any、never、联合类型，
// 比如 class 有 public、protected、private 的属性，
// 比如索引类型有具体的索引和可索引签名，索引还有可选和非可选。。。

// 如果给我们一种类型让我们判断是什么类型，应该怎么做呢？

// 类型的判断要根据它的特性来，比如判断联合类型就要根据它的 distributive 的特性。

// 1. IsAny
// any 类型与任何类型的交叉都是 any，也就是 1 & any 结果是 any。
type IsAny<T, Str, Sub> = Str extends Sub & T ? true : false;
type IsAnyResult = IsAny<any, '123', '231'>;

// 2. IsEqual
type IsEquals<A, B> = (A extends B ? true : false) &
	(B extends A ? true : false);

// 3. IsNever
type IsNever<T> = T extends never ? true : false; // bad
// 注意：never与所有子元素匹配都为true

type IsNever2<T> = [T] extends [never] ? true : false; // good
type IsAnys<T> = T extends number ? 1 : 2; // good

type IsNeverRes = IsNever<never>;
type IsNeverRes2 = IsNever2<never>;
type IsAnyRes = IsAnys<any>;

// 4. IsTuple
type IsTuple<T> = T extends [...params: infer Eles]
	? NotEqual<Eles['length'], number>
	: false;

type NotEqual<A, B> = (<T>() => T extends A ? 1 : 2) extends <
	T,
>() => T extends B ? 1 : 2
	? false
	: true;

// ==================== hard ============================
