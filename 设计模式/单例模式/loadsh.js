// loadsh使⽤单例模式加载的示例
class LodashLoader {
	static instance = null;
	static getInstance() {
		if (!LodashLoader.instance) {
			LodashLoader.instace = new LodashLoader();
		}
		return LodashLoader.instance;
	}
	constructor() {
		loadScript('https://cnd.jsdelivr.net/npm/lodash@4.17.15/lodash.min.js');
	}
}

// 脚本引入方式
function loadScript(url) {
	const $script = document.createElement('script');
	$script.src = url;
	$script.onload = function () {
		console.log('loaded', url);
	};

	document.body.appendChild($script);
}

window.LodashLoader = LodashLoader;
