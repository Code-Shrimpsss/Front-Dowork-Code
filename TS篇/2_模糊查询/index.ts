// ----------------------------------------------------------------
// 匹配模式 :
// Typescript 类型的模式匹配是通过 extends 对类型参数做匹配，结果保存到通过 infer 声明的局部类型变量里，如果匹配就能从该局部变量里拿到提取出的类型。
type ProM = Promise<'Test-Promise'>;
type GetValue<ProM> = ProM extends Promise<infer Value> ? Value : never;
type getValueResult = GetValue<Promise<'123'>>;

// 数组类型
type arr_mock = [1, 2, 3];

type GetArrMockFirst<Array extends unknown[]> = Array extends [infer First, ...unknown[]] ? First : never;
type GetArrMockFirstResult = GetArrMockFirst<arr_mock>;

type GetArrMockLast<Array extends unknown[]> = Array extends [...unknown[], infer Last] ? Last : never;
type GetArrMockLastResult = GetArrMockLast<arr_mock>;

type GetArrMockPop<Array extends unknown[]> = Array extends []
	? []
	: Array extends [...infer Rest, unknown]
	? Rest
	: never;

type GetArrMockPopResult = GetArrMockPop<arr_mock>;

type GetArrMockShift<Array extends unknown[]> = Array extends []
	? []
	: Array extends [unknown, ...infer Rest]
	? Rest
	: never;

type GetArrMockShiftResutlt = GetArrMockShift<arr_mock>;

// 字符串类型
// - 字符串匹配
type StartsWith<Str extends string, Prefix extends string> = Str extends `${Prefix}${string}` ? Str : Prefix;
type StrTest1 = StartsWith<'test123', 'test'>;

// - 字符串替换
type ReplaceStr<
	Str extends string,
	From extends string,
	To extends string,
> = Str extends `${infer Prefix}${From}${infer Suffix}` ? `${Prefix}${To}${Suffix}` : Str;

type ReplaceResult = ReplaceStr<"Guangguang's best friend is ?", '?', 'Dongdong'>;

type ReplaceResult2 = ReplaceStr<'abc', '?', 'Dongdong'>;

// - 递归去空格
type TrimStrRight<Str extends string> = Str extends `${infer Rest}${' ' | '\n' | '\t'}` ? TrimStrRight<Rest> : Str;

type TrimStrLeft<Str extends string> = Str extends `${' ' | '\n' | '\t'}${infer Rest}` ? TrimStrLeft<Rest> : Str;

type TrimStr<Str extends string> = TrimStrRight<TrimStrLeft<Str>>;

type TrimStrResult = TrimStrRight<'  code      '>;
type TrimStrResult1 = TrimStr<'   code      '>;
type TrimStrResult2 = TrimStrLeft<'   code      '>;

// - 函数
// 函数类型可以通过模式匹配来提取参数的类型：
type GetParameters<Func extends Function> = Func extends (...args: infer Args) => unknown ? Args : never;
type ParameResults = GetParameters<(name: 'test123') => string>;

type GetReturnType<Func extends Function> = Func extends (...args: any[]) => infer ReturnType ? ReturnType : never;
// 这里不能用 unknown，这里的解释涉及到参数的逆变性质
type ParameResults1 = GetReturnType<(name: 'test123') => 'Return Value'>;

class Dong {
	name: string;
	constructor() {
		this.name = 'Shrimpsss';
	}
	// 添加this限制
	hello(this: Dong) {
		return "hello, I'm " + this.name;
	}
}

const dong = new Dong();
console.log(dong.hello());

// dong.hello.call({ xxx: 'new Object' }); // Error

// - this
type GetThisParameterType<T> = T extends (this: infer ThisType, ...args: any[]) => any ? ThisType : unknown;
type GetThisResult = GetThisParameterType<typeof dong.hello>;

// - 构造器类型
interface Person {
	name: string;
}

interface PersonConstructor {
	new (name: string): Person;
	// 返回Person类型的实例对象

	// new Person()
}

type GetInstanceType<ConstructorType extends new (...args: any) => any> = ConstructorType extends new (
	...args: any
) => infer InstanceType
	? InstanceType
	: any;

type GetInstanceRes = GetInstanceType<PersonConstructor>;

type GetConstructorParameters<ConstructorType extends new (...args: any) => any> = ConstructorType extends new (
	...args: infer ParametersType
) => any
	? ParametersType
	: never;

type GetInstanceRes1 = GetConstructorParameters<PersonConstructor>;

// GetRefProps
type GetRefProps<Props> = 'ref' extends keyof Props
	? Props extends { ref?: infer Value | undefined }
		? Value
		: never
	: never;

type GetRefRueslt = GetRefProps<{ ref: 'react-dom'; vistion: '23234' }>;
type GetRefRueslt1 = GetRefProps<{ ref: undefined; vistion: '23234' }>;

// type TestMock<Obj extends Object> = Obj extends Obj ? Obj : never;
