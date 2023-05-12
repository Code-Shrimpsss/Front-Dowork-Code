// 不支持Promise（循环阻塞）
const sleep = (ms) => {
	var start = new Date().getTime();
	while (new Date().getTime() - start < ms);
};

// 支持Promise（非循环阻塞）
const sleep = (ms) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};
