// 1. push & unshift
// 数组和元组的区别：数组类型是指任意多个同一类型的元素构成的，比如 number[]、Array<number>，
// 而元组则是数量固定，类型可以不同的元素构成的，比如 [1, true, 'guang']。
type tuple = [1, 2, 3];

type Push<Arr extends unknown[], Ele> = [...Arr, Ele];
type newPush = Push<tuple, '123'>;

type Unshift<Arr extends unknown[], Ele> = [Ele, ...Arr];
type newUnshift = Unshift<tuple, '123'>;

// 2. zip
// 合并两个元组
// 条件元组内元素可以无限个，但是只能有两个元组参数
type tuple1 = [1, 2, 3];
type tuple3 = ['guang', 'dong', 'ssss'];

type Zip<One extends unknown[], Other extends unknown[]> = One extends [
	infer OneFirst,
	...infer OneRest,
]
	? Other extends [infer OtherFirst, ...infer OtherRest]
		? [[OneFirst, OtherFirst], ...Zip<OneRest, OtherRest>]
		: []
	: [];

type ZipResult = Zip<tuple1, tuple3>;

// 3. Capiatlize
// 字符串重新构造
// 从已有的字符串类型中提取出一些部分字符串，经过一系列变换，构造成新的字符串类型。

// 3.1 首字母大写
type str = 'hello world';

type CapitalizeStr<Str extends string> =
	Str extends `${infer First}${infer Rest}`
		? `${Uppercase<First>}${Rest}`
		: Str;

type CapitalizeStrResult = CapitalizeStr<str>;

// 3.2 CamelCase
// 驼峰式转换（递归）
type str1 = 'hello_world_vito';

type CamelCase<Str extends string> =
	Str extends `${infer Left}_${infer Right}${infer Rest}`
		? `${Left}${Uppercase<Right>}${CamelCase<Rest>}`
		: Str;

type CamelCaseResult = CamelCase<str1>;

// 3.3 DropSubStr
// 删除指定字符串（递归）
type str2 = 'kill~ill~';

type DropSubStr<
	Str extends string,
	SubStr extends string,
> = Str extends `${infer Prefix}${SubStr}${infer Suffix}`
	? DropSubStr<`${Prefix}${Suffix}`, SubStr>
	: Str;

type DropSubStrResult = DropSubStr<str2, 'ill'>;

// 4. AppendArgument
// 函数类型重构
type fun = (name: string) => boolean;

type AppendArgument<Func extends Function, Arg> = Func extends (
	...args: infer Args
) => infer ReturnType
	? (...args: [...Args, Arg]) => ReturnType
	: Func;

type AppendArgumentResult = AppendArgument<fun, number>;

// 5. 索引类型的重新构造

// 5.1 Mapping
// before
type obj = {
	name: string;
	age: number;
	gender: boolean;
};
// after
// type obj = {
// 	readonly name: string;
// 	age?: number;
// 	gender: boolean;
// }

type Mapping<Obj extends Object> = {
	[Key in keyof Obj]: [Obj[Key], Obj[Key], Obj[Key]];
};

type MapResult = Mapping<obj>;

// 5.2 UppercaseKey
type UppercaseKey<Obj extends Object> = {
	[Key in keyof Obj as Uppercase<Key & string>]: Obj[Key];
};

type UppercaseKeyResult = UppercaseKey<obj>;

// 5.3 Record
type NewRecord<K extends string | number | symbol, T> = { [P in K]: T };
type NewRecordResult = NewRecord<123, '123'>;
// 优化
type RecordUppercaseKey<Obj extends NewRecord<string, any>> = {
	[Key in keyof Obj as Uppercase<Key & string>]: Obj[Key];
};

type RecordUppercaseResult = RecordUppercaseKey<{
	name: '123';
	habbys: [{ game: 'test' }];
}>;

// 5.4 ToPartial
type ToPartial<T> = {
	[Key in keyof T]?: T[Key];
};

type ToPartialResult = ToPartial<{ name: 'test'; age: 22 }>;

// 5.4 ToRequired
type ToRequired<T> = {
	[Key in keyof T]-?: T[Key];
};

type ToRequiredResult = ToRequired<{ name?: 'test'; age: 22 }>;
type ToRequiredResult2 = ToRequired<ToPartial<{ name: 'test'; age: 22 }>>;
type ToRequiredResult3 = ToPartial<ToRequired<{ name: 'test'; age: 22 }>>;

// 5.6 ToReadonly
// 索引类型的索引可以添加 readonly 的修饰符，代表只读。（写法适用于其他关键字）
type ToReadonly<T> = {
	readonly [Key in keyof T]: T[Key];
};

type ToReadonlyResult = ToReadonly<{ name: 'test'; age: 88 }>;

// 5.7 ToMutable
// 去除readonly （写法适用于其他关键字）
type ToMutable<T> = {
	-readonly [Key in keyof T]: T[Key];
};

type ToMutableResult = ToMutable<{ readonly name: 'test'; age: 88 }>;

// 5.8 FilterByValueType
// 过滤索引类型
type FilterByValueType<Obj extends NewRecord<string, any>, ValueType> = {
	[Key in keyof Obj as Obj[Key] extends ValueType ? Key : never]: Obj[Key];
};

interface NewFilterTest {
	name: string;
	age: number;
	hobbys: [];
}

type FilterByValueTypeResult = FilterByValueType<
	NewFilterTest,
	string | number
>;
