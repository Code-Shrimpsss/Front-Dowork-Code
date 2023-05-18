// 递归复用
// ps: 在类型体操里，遇到数量不确定的问题，就要条件反射的想到递归
// ----------------------- Use ---------------------------

// 1. promise

// 1.1 DeepPromiseValueType

// bad
type tttpromise = Promise<Promise<Promise<Record<string, number>>>>;

// type tttResult = tttpromise<Promise<"23123", "1232">>

// common
type DeepPromiseValueType<P extends Promise<unknown>> = P extends Promise<
	infer ValueType
>
	? ValueType extends Promise<unknown>
		? DeepPromiseValueType<ValueType>
		: ValueType
	: never;

type DeepPromiseValueResult = DeepPromiseValueType<tttpromise>;

// good
type NewDeepPromiseValueType<T> = T extends Promise<infer ValueType>
	? NewDeepPromiseValueType<ValueType>
	: T;

type DeepPromiseValueResult2 = NewDeepPromiseValueType<tttpromise>;

// ----------------------------------------------------------------
// 2. Array
// 2.1 ReverseArr
// 反转数组
type arr = [1, 2, 3, 4, 5];

type ReverseArrValue<Arr extends unknown[]> = Arr extends [
	infer First,
	...infer Rest,
]
	? [...ReverseArrValue<Rest>, First]
	: Arr;

type ReverseArrValueResult = ReverseArrValue<arr>;
// error 2: number[] -> unknown[]; ReverseArrValue<First,Rest> -> [...ReverseArrValue<Rest>, First];

// 2.2 Includes
// 查找元素

// 比如查找 [1, 2, 3, 4, 5] 中是否存在 4，是就返回 true，否则返回 false。
// type IncludesArrValue<
// 	Arr extends unknown[],
// 	Ele extends number,
// > = Ele extends Arr IncludesArrValue ? true : false;

type IsEqual<A, B> = (A extends B ? true : false) &
	(B extends A ? true : false);

type IncludesArrValue<Arr extends unknown[], Ele> = Arr extends [
	infer First,
	...infer Rest,
]
	? IsEqual<First, Ele> extends true
		? true
		: IncludesArrValue<Rest, Ele>
	: false;

type IncludesArrValueResult = IncludesArrValue<arr, 2>;
type IncludesArrValueResult1 = IncludesArrValue<arr, 22>;
type IncludesArrValueResult2 = IncludesArrValue<arr, 5>;

// 2.3 RemoveItem
// 删除数组元素
type RemoveItem<
	Arr extends unknown[],
	DelItem,
	Result extends unknown[] = [],
> = Arr extends [infer First, ...infer Rest]
	? IsEqual<First, DelItem> extends true
		? RemoveItem<Rest, DelItem, Result>
		: RemoveItem<Rest, DelItem, [...Result, First]>
	: Result;

type RemoveItemResult = RemoveItem<arr, 2>;
type RemoveItemResult1 = RemoveItem<arr, 22>;
type RemoveItemResult2 = RemoveItem<arr, 5>;

// 2.4 BuildArray - hard
// 构造数组类型
type BuildArray<
	Length extends number,
	Ele = unknown,
	Arr extends unknown[] = [],
> = Arr['length'] extends Length ? Arr : BuildArray<Length, Ele, [...Arr, Ele]>;

type BuildArrayResult = BuildArray<10, 'test'>;

// ----------------------------------------------------------------
// 3. string

// 3.1 ReplaceAll
// 替换所有匹配字符
type ReplaceAll<
	Str extends string,
	From extends string,
	To extends string,
> = Str extends `${infer Prefix}${From}${infer Suffix}`
	? `${Prefix}${To}${ReplaceAll<Suffix, From, To>}`
	: Str;

type ReplaceAllResult = ReplaceAll<'hello world, young man', ' ', '⭐'>;

// 3.2 StringToUnion
// 将每个字符提取出来组成联合类型
type StringToUnion<Str extends string> =
	Str extends `${infer Frist}${infer Rest}`
		? Frist | StringToUnion<Rest>
		: never;

type StringToUnionResult = StringToUnion<'hello'>;

// 3.3 ReverseStr
// 将每个字符提取出来组成联合类型
type ReverseStr<
	Str extends string,
	Result extends string = '',
> = Str extends `${infer First}${infer Rest}`
	? ReverseStr<Rest, `${First}${Result}`>
	: Result;

type ReverseStrResult = ReverseStr<'hello'>;

// ----------------------------------------------------------------
// 3. Object

// DeepReadonly
// 给元素添加 readonly
type deepObj = {
	a: {
		b: {
			c: {
				f: () => 'dong';
				d: {
					e: {
						guang: string;
					};
				};
			};
		};
	};
};

type DeepReadonly<Obj extends Record<string, any>> =
	// readonly [Key in keyof Obj]: Obj[Key];
	Obj extends any
		? {
				readonly [Key in keyof Obj]: Obj[Key] extends Object
					? Obj[Key] extends Function
						? Obj[Key]
						: DeepReadonly<Obj[Key]>
					: Obj[Key];
		  }
		: never;

type DeepReadonlyResult = DeepReadonly<deepObj>['a'];
// ts 的类型只有被用到的时候才会做计算
