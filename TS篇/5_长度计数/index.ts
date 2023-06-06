// 数组长度计数
// *：难度较高
// ps: TypeScript 类型系统中没有加减乘除运算符，但是可以通过构造不同的数组然后取 length 的方式来完成数值计算，把数值的加减乘除转化为对数组的提取和构造。
// ----------------------- Use ---------------------------

type num1 = [unknown]['length'];
type num2 = [unknown]['0'];

// 1. Add
type NewBuildArray<
	Length extends number,
	Ele = unknown,
	Arr extends unknown[] = [],
> = Arr['length'] extends Length ? Arr : BuildArray<Length, Ele, [...Arr, Ele]>;

type NewBuildArrayResult = NewBuildArray<10, 'n'>;

type Add<Num1 extends number, Num2 extends number> = [
	...NewBuildArray<Num1>,
	...NewBuildArray<Num2>,
]['length'];

type AddResult = Add<44, 88>;

// 2. Subtract
type Subtract<
	Num1 extends number, // 减数
	Num2 extends number, // 被减数
> = BuildArray<Num1> extends [...arr1: BuildArray<Num2>, ...arr2: infer Rest]
	? Rest['length']
	: never;

type SubtractResult = Subtract<22, 11>;

// 3. Mutiply
type Mutiply<
	Num1 extends number,
	Num2 extends number,
	ResultArr extends unknown[] = [],
> = Num2 extends 0
	? ResultArr['length']
	: Mutiply<Num1, Subtract<Num2, 1>, [...BuildArray<Num1>, ...ResultArr]>;
// 22, 1,

type MutiplyResult = Mutiply<22, 2>;

/* 
因为乘法是多个加法结果的累加，我们加了一个类型参数 ResultArr 来保存中间结果，默认值是 []，相当于从 0 开始加。
每加一次就把 Num2 减一，直到 Num2 为 0，就代表加完了。
加的过程就是往 ResultArr 数组中放 Num1 个元素。
这样递归的进行累加，也就是递归的往 ResultArr 中放元素。
最后取 ResultArr 的 length 就是乘法的结果。
*/

// 4. Divide
type Divide<
	Num1 extends number,
	Num2 extends number,
	CountArr extends unknown[] = [],
> = Num1 extends 0
	? CountArr['length']
	: Divide<Subtract<Num1, Num2>, Num2, [unknown, ...CountArr]>;

type DivideResult = Divide<22, 2>;

/* 
类型参数 Num1 和 Num2 分别是被减数和减数。
类型参数 CountArr 是用来记录减了几次的累加数组。
如果 Num1 减到了 0 ，那么这时候减了几次就是除法结果，也就是 CountArr['length']。
否则继续递归的减，让 Num1 减去 Num2，并且 CountArr 多加一个元素代表又减了一次。
*/

// 5. StrLen
// 获取字符串长度
type StrLen<
	Str extends string,
	CountArr extends unknown[] = [],
> = Str extends `${string}${infer Rest}`
	? StrLen<Rest, [...CountArr, unknown]>
	: CountArr['length'];

type StrLenResult = StrLen<'hello'>;

// 6. GreaterThan
// 数值运算
type GreaterThan<
	Num1 extends number,
	Num2 extends number,
	CountArr extends unknown[] = [],
> = Num1 extends Num2
	? false
	: CountArr['length'] extends Num2
	? true
	: CountArr['length'] extends Num1
	? false
	: GreaterThan<Num1, Num2, [...CountArr, unknown]>;

type GreaterThanResult = GreaterThan<22, 123>;

/* 
类型参数 Num1 和 Num2 是待比较的两个数。
类型参数 CountArr 是计数用的，会不断累加，默认值是 [] 代表从 0 开始。
如果 Num1 extends Num2 成立，代表相等，直接返回 false。
否则判断计数数组的长度，如果先到了 Num2，那么就是 Num1 大，返回 true。
反之，如果先到了 Num1，那么就是 Num2 大，返回 false。
如果都没到就往计数数组 CountArr 中放入一个元素，继续递归。
*/

// 7. Fibonacci
// 斐波那契数列（当前的数是前两个数的和的规律）
// F(0) = 1，F(1) = 1, F(n) = F(n - 1) + F(n - 2)（n ≥ 2，n ∈ N*）

type FibonacciLoop<
	PrevArr extends unknown[],
	CurrentArr extends unknown[],
	IndexArr extends unknown[] = [],
	Num extends number = 1,
> = IndexArr['length'] extends Num
	? CurrentArr['length']
	: FibonacciLoop<
			CurrentArr,
			[...PrevArr, ...CurrentArr],
			[...IndexArr, unknown],
			Num
	  >;

type Fibonacci<Num extends number> = FibonacciLoop<[1], [], [], Num>;

type FibonacciLoopResult = Fibonacci<9>;

/* 
类型参数 PrevArr 是代表之前的累加值的数组。类型参数 CurrentArr 是代表当前数值的数组。
类型参数 IndexArr 用于记录 index，每次递归加一，默认值是 []，代表从 0 开始。
类型参数 Num 代表求数列的第几个数。
判断当前 index 也就是 IndexArr['length'] 是否到了 Num，到了就返回当前的数值 CurrentArr['length']。
否则求出当前 index 对应的数值，用之前的数加上当前的数 [...PrevArr, ... CurrentArr]。
然后继续递归，index + 1，也就是 [...IndexArr, unknown]。
这就是递归计算 Fibinacci 数列的数的过程。
*/
