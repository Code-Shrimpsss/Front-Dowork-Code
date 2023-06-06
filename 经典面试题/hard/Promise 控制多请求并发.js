// 如果 100 个请求，你怎么用 Promise 去控制并发？

// TODO: 设计一个函数，可以限制请求的并发，同时请求结束之后，调用callback函数
// HACK:sendRequest(requestList:,limits,callback):void
// FIXME:表示代码中有bug需要修复

sendRequest(
	[
		() => request('1'),

		() => request('2'),

		() => request('3'),

		() => request('4'),
	],

	3, //并发数

	(res) => {
		console.log(res);
	},
);

// 其中request 可以是：
function request(url, time = 1) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log('请求结束：' + url);

			if (Math.random() > 0.5) {
				resolve('成功');
			} else {
				reject('错误;');
			}
		}, time * 1e3);
	});
}

/* 
并发：并发是多个任务同时交替的执行（因为cpu执行指令的速度非常之快，它可以不必按顺序一段代码一段代码的执行，这样效率反而更加低下），这样看起来就是一起执行的，所以叫并发。
并行：可以理解为多个物理cpu或者有分布式系统，是真正的'同时'执行
并发控制：意思是多个并发的任务，一旦有任务完成，就立刻开启下一个任务
切片控制：将并发任务切片的分配出来，比如10个任务，切成2个片，每片有5个任务，当前一片的任务执行完毕，再开始下一个片的任务，这样明显效率没并发控制那么高了
*/

/* 

思路
首先执行能执行的并发任务，根据并发的概念，每个任务执行完毕后，捞起下一个要执行的任务。

将关键步骤拆分出合适的函数来组织代码

循环去启动能执行的任务
取出任务并且推到执行器执行
执行器内更新当前的并发数，并且触发捞起任务
捞起任务里面可以触发最终的回调函数和调起执行器继续执行任务
*/

function sendRequest(requestList, limits, callback) {
	const promises = requestList.slice(); // 取得请求list（浅拷贝一份）

	// 得到开始时，能执行的并发数

	const concurrentNum = Math.min(limits, requestList.length);

	let concurrentCount = 0; // 当前并发数

	// 第一次先跑起可以并发的任务

	const runTaskNeeded = () => {
		let i = 0;

		// 启动当前能执行的任务

		while (i < concurrentNum) {
			i++;

			runTask();
		}
	};

	// 取出任务并且执行任务

	const runTask = () => {
		const task = promises.shift();

		task && runner(task);
	};

	// 执行器

	// 执行任务，同时更新当前并发数

	const runner = async (task) => {
		try {
			concurrentCount++;

			await task();
		} catch (error) {
		} finally {
			// 并发数--

			concurrentCount--;

			// 捞起下一个任务
			picker();
		}
	};

	// 捞起下一个任务

	const picker = () => {
		// 任务队列里还有任务并且此时还有剩余并发数的时候 执行
		if (concurrentCount < limits && promises.length > 0) {
			// 继续执行任务

			runTask();

			// 队列为空的时候，并且请求池清空了，就可以执行最后的回调函数了
		} else if (promises.length == 0 && concurrentCount == 0) {
			// 执行结束

			callback && callback();
		}
	};

	// 入口执行

	runTaskNeeded();
}

/* 
总结一下要点：

利用race的特性可以找到 并发任务 里最快结束的请求
利用for await 可以保证for结构体下面的代码是最后await 后的微任务，而在最后一个微任务下，可以保证所有的promise已经存入promises里（如果没命中任何一个await，即限制并发数>任务数的时候，虽然不是在微任务当中，也可以保证所有的promise都在里面），最后利用allSettled，等待所有的promise状态转变后，调用回调函数
并发任务池 用Set结构存储，可以通过指针来删除对应的任务，通过闭包引用该指针从而达到 动态控制并发池数目
for await 结构体里，其实await下面，包括结构体外 都是属于微任务（前提是有一个await里面的if被命中），至于这个微任务什么时候被加入微任务队列，要看请求的那里的在什么时候开始标记（resolve/reject ）
for await 里其实 已经在此轮宏任务当中并发执行了，await后面的代码被挂起来，等前一个promise转变状态-->移出pool-->将下一个promise捞起加入pool当中 -->下一个await等待最快的promise，如此往复。
可以想象这样一个场景，几组人 在玩百米接力赛，每一组分别在0m,100m,200m的地方，有几个赛道每组就有几个人。（注意，这里想象成 每个节点（比如0m处） 这几个人是一组），每到下一个节点的人，将棒子交给排队在最前面的下一个人，下一个人就开始跑。
*/

/* 
疑问
Promise.allSettled 和race 传入的Promise<any>[]可以被其中的触发微任务操作增减，这样做会改变结果吗？
有什么能拓展的功能呢？
1.想要在执行之后得到返回所需要的结果

（在第二种方法当中已经实现，第一种方法下可以 通过 增加一个 task->结果 的map来收集，或者对所有的task分别包裹一层Promise，形成一个新的promiseList，放到Promise.allSettled里面，再把resolve以task->resolve的方式映射出来，在runner里面找到把Promise实例通过对应的resolve暴露出去）

2.增加一个参数用来控制请求失败的重试次数
*/
