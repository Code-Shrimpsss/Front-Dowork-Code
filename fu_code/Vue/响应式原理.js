// 当通过读取vue data中的数据，需要收集依赖，把依赖以及对应的effect放入deps map。

// mock data
const data = {
	price: 10,
	count: 5,
};

// handle code
const depsMap = {}; // 依赖集合 - depsMap是一个以数据对象中的每个key为键、存储相关effect的Map。
let effect = null;
let proxyCtx = null; // 上下文

function defineReactive(target) {
	// 通过new Proxy创建data对象的代理对象proxyCtx
	proxyCtx = new Proxy(target, {
		// 将作用于该数据的effect(render函数)收集到depsMap中。
		get: (target, key) => {
			const matchKeyEffects = depsMap[key];
			if (matchKeyEffects && effect) {
				const effectIsExist = matchKeyEffects.includes(effect);
				if (!effectIsExist) {
					depsMap[key].push([effect]);
				}
			} else {
				depsMap[key] = [effect];
			}
			return target[key];
		},
		// 当对象的值发生改变时,我们取出与该key相关的所有effect,并执行它们,完成更新操作。
		set: (target, key, newValue) => {
			// depsMap更新
			target[key] = newValue;
			const matchKeyEffects = depsMap[key] || [];
			matchKeyEffects.forEach((effect) => effect());
			// 这一步在Vue中是交给调度器执行的，调度器会推入到下一次事件队列
			console.log('matchKeyEffects', matchKeyEffects);
		},
	});
}

defineReactive(data);

let isFirst = true; // 默认第一次

function render() {
	console.log('proxtData', proxyCtx);
	if (isFirst) {
		const div = document.createElement('div');
		div.innerHTML = `单价: ${proxyCtx.price}, 总量: ${proxyCtx.count}, 总价: ${proxyCtx.price * proxyCtx.count}`;
		document.getElementsByTagName('body')[0].appendChild(div);
		isFirst = false;
	} else {
		const div = document.getElementsByTagName('div')[0];
		div.innerHTML = `单价: ${proxyCtx.price}, 总量: ${proxyCtx.count}, 总价: ${proxyCtx.price * proxyCtx.count}`;
	}
}

effect = render; // 挂载render函数为响应式effect

render();

/* 
* 代码解析
* get 主要做的事
1. 检查当前key是否已经有相关联的响应式effect。
- 如果有(matchKeyEffects存在),则进一步判断是否已经收集过当前的effect。
  - 如果没有收集过,则将当前effect push进depsMap[key]中,完成收集。
- 如果没有(matchKeyEffects不存在),则直接将depsMap[key]初始化为[effect],完成首次收集。
2. 返回target[key],允许get操作继续进行,获取目标值。

* set 主要做的事
1. 设置新值
2. 获取当前key相关联的所有响应式effect
3. 遍历执行它们,完成更新操作

* effect = render; 这一步做了什么
1. 将render函数与proxyCtx的数据建立了响应式联系。
2. 通过get拦截器,render函数被收集到了depsMap中,与proxyCtx的数据建立关联。
*/
