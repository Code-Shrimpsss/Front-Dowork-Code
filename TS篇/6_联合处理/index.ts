// 本篇内容较难
type Union = 'a' | 'b' | 'c';

type UppercaseA<Item extends string> = Item extends 'a'
	? Uppercase<Item>
	: Item;

type UppercaseResult = UppercaseA<Union>;

// CamelcaseUnion
type Camelcase<Str extends string> =
	Str extends `${infer Left}_${infer Right}${infer Rest}`
		? `${Left}${Uppercase<Right>}${Camelcase<Rest>}`
		: Str;

type CamelcaseUnionArr<Arr extends unknown[]> = Arr extends [
	infer Item,
	...infer RestArr,
]
	? [Camelcase<Item & string>, ...CamelcaseUnionArr<RestArr>]
	: [];

type CamelcaseUnionArrResult = CamelcaseUnionArr<['aa_aa', 'bbb_b', 'c_ccc']>;

// CamelcaseUnion v2
type CamelcaseUnion<Item extends string> =
	Item extends `${infer Left}_${infer Right}${infer Rest}`
		? `${Left}${Uppercase<Right>}${CamelcaseUnion<Rest>}`
		: Item;

type CamelcaseUnionResult = CamelcaseUnion<'aa_aa' | 'bbb_b' | 'c_ccc'>;

// 2. 联合类型进阶
// 2.1 IsUnion
type IsUnion<A, B = A> = A extends A ? ([B] extends [A] ? false : true) : never;

type IsUnionResult = IsUnion<'a' | 'b' | 'c' | 'd'>;

// =========================== STOP ====================================

// TestUnion
type TestUnion<A, B = A> = A extends A ? { a: A; b: B } : never;

type TestUnionResult = TestUnion<'a' | 'b' | 'c'>;

// BEM
type BEM<
	Block extends string,
	Element extends string[],
	Modifiers extends string[],
> = `${Block}__${Element[number]}--${Modifiers[number]}`;

type bemResult = BEM<'guang', ['aaa', 'bbb'], ['warning', 'success']>;

// AllCombinations
type Combination<A extends string, B extends string> =
	| A
	| B
	| `${A}${B}`
	| `${B}${A}`;

type AllCombinations<A extends string, B extends string = A> = A extends A
	? Combination<A, AllCombinations<Exclude<B, A>>>
	: never;

type AllCombinationsResult = AllCombinations<'A' | 'B' | 'C'>;
