const jbl = document.querySelectorAll('.job-list-box>li');
// 你希望去掉哪些地区的岗位
const filterList = [
	// '昆山市',
	// '吴中区',
	// '常熟市',
	// '张家港市',
	// '太仓市',
	// '虎丘区',

	// ==== 深圳 ====
	// '罗湖区',
	// '福田区',
	// '南山区',
	// '宝安区',
	// '龙岗区',
	// '盐田区',
	'龙华区',
	'坪山区',
	'光明区',
];
// 这里是你所投递岗位的技术栈关键词
const jobMatchList = [
	'JavaScript',
	'TypeScript',
	'前端开发',
	// '小程序',
	'Vue',
	'React',
	'Node',
	'CSS',
	'HTML',
	'HTML5',
	'前端开发经验',
];
// 不想投递的公司
const excludedCompanies = [
	'中软国际',
	'软通动力',
	'中电文思海辉',
	'博彦科技',
	'纬创科技',
	'信华信',
	'中科软',
	'汇合发展',
];

let isSubmitting = false;
let currentPage = 1;
let maxPage = 6;
let submitCount = 0;

// 判断某个标签是否加载完成
function judgeNodeLoaded(selector) {
	const node = document.querySelector(selector);
	return node !== null;
}

// 判断某一页是否完全加载完毕
function judgeNextPageLoaded(selector) {
	let requestId;
	return new Promise((resolve) => {
		function loopJudge() {
			const jobList = document.querySelectorAll('.job-list-box>li');
			if (!jobList?.length) {
				requestId = window.requestAnimationFrame(loopJudge);
			} else {
				requestId = undefined;
				window.cancelAnimationFrame(requestId);
				resolve(jobList);
			}
		}

		requestId = window.requestAnimationFrame(loopJudge);
	});
}

function sleep(time) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve();
		}, time);
	});
}

async function toNext() {
	const next = document.querySelector('.options-pages>a:last-child');
	if (next.className.indexOf('disabled') >= 0) return false;
	next.click();
	const jobList = await judgeNextPageLoaded();
	return jobList;
}

// 判断是否到最后一条
async function judgeIsLast(i, l) {
	if (i === l - 1) {
		const nl = await toNext();
		if (!nl) {
			console.error('当前已是最后一页');
			return;
		}
		loopSubmit(nl);
		return true;
	}
}

// 投递
async function loopSubmit(nodeList) {
	console.warn(`开始投递第${currentPage}页的岗位`);
	for (let i = 0; i < nodeList.length; i++) {
		const companyName =
			nodeList[i].querySelector('.company-name>a').innerText;

		// 过滤公司名称
		if (unCompanyName.filter((item) => item === companyName).length > 0) {
			return;
		}

		// 判断沟通按钮状态
		const chatBtn = nodeList[i].querySelector('.start-chat-btn'); // 沟通按钮
		// 如果当前岗位已被投递过，则跳过
		if (chatBtn.innerText === '继续沟通') {
			debugger;
			console.log('当前岗位已沟通：', companyName);
			const isLast = await judgeIsLast(i, nodeList.length);
			if (isLast) return;
		}
		// 判断是否猎头
		const tagIcon = nodeList[i].querySelector('.job-tag-icon'); //
		if (tagIcon && tagIcon.alt === '猎头') {
			console.log('当前岗位是猎头：', companyName);
			const isLast = await judgeIsLast(i, nodeList.length);
			if (isLast) return;
			continue;
		}
		// 判断公司地址
		const companyPlace = nodeList[i].querySelector('.job-area').innerText;
		const hasArea = filterList.findIndex(
			(area) => companyPlace.indexOf(area) >= 0,
		);
		if (hasArea >= 0) {
			const isLast = await judgeIsLast(i, nodeList.length);
			if (isLast) return;
			continue;
		}
		// 判断是否岗位不匹配
		const jobDesc = nodeList[i].querySelector(
			'.job-card-footer>.tag-list',
		).innerText;
		const jobNotMatch = jobMatchList.findIndex(
			(job) => jobDesc.indexOf(job) >= 0,
		);
		if (jobNotMatch < 0) {
			console.log('当前岗位不匹配：', companyName);
			const isLast = await judgeIsLast(i, nodeList.length);
			if (isLast) return;
			continue;
		}

		await new Promise((resolve, reject) => {
			debugger;
			chatBtn.click();
			let timer;

			// 1.判断是否进到了聊天页面，进入了表示已经投递成功
			timer = setInterval(async () => {
				// 沟通上限弹窗
				let chatBlock = document.querySelector(
					'.chat-block-dialog .chat-block-body',
				);

				if (judgeNodeLoaded('.chat-content')) {
					// 此时表示进入了聊天列表，开始返回上一页并判断是否回到上一页
					window.clearInterval(timer);
					await sleep(1000);
					window.history.back();

					// 开始判断是否回到列表页
					timer = setInterval(() => {
						console.log(judgeNodeLoaded('.search-btn'));
						if (judgeNodeLoaded('.search-btn')) {
							console.log(`公司：${companyName}-投递完毕`);

							window.localStorage.setItem(
								'submitCount',
								submitCount++,
							);

							window.clearInterval(timer);

							setTimeout(async () => {
								resolve();
								if (
									i === nodeList.length - 1 &&
									currentPage <= maxPage
								) {
									console.log(
										`当前页（${currentPage}）投递完毕，开始进入下一页${
											currentPage + 1
										}`,
									);
									currentPage++;
									// 当前页执行完毕，进入下一页
									const jobList = await toNext();
									// 判断是否进入下一页
									loopSubmit(jobList);
								}
							}, 1000);
						}
					}, 200);
				} else if (
					chatBlock &&
					chatBlock.innerText === '今日沟通人数已达上限，请明天再试'
				) {
					window.clearInterval(timer);
					return reject('今日沟通人数已达上限');
				}
			}, 1000);
		});
	}
}

// --------------------------- open -------------------------------------
loopSubmit(jbl);
