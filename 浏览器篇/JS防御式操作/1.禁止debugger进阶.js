(() => {
	function block() {
		if (
			window.outerHeight - window.innerHeight > 200 ||
			window.outerWidth - window.innerWidth > 200
		) {
			document.body.innerHTML = '检测到非法调试,请关闭后刷新重试!';
		}
		setInterval(() => {
			(function () {
				return false;
			})
				['constructor']('debugger')
				['call']();
		}, 50);
	}
	try {
		block();
	} catch (err) {}
})();

// 模拟攻击

/* 
eval(
	(function (c, g, a, b, d, e) {
		d = String;
		if (!''.replace(/^/, String)) {
			for (; a--; ) e[a] = b[a] || a;
			b = [
				function (f) {
					return e[f];
				},
			];
			d = function () {
				return '\\w+';
			};
			a = 1;
		}
		for (; a--; )
			b[a] &&
				(c = c.replace(new RegExp('\\b' + d(a) + '\\b', 'g'), b[a]));
		return c;
	})(
		'(()=>{1 0(){2(()=>{3("4")()},5)}6{0()}7(8){}})();',
		9,
		9,
		'block function setInterval Function debugger 50 try catch err'.split(
			' ',
		),
		0,
		{},
	),
);


*/
