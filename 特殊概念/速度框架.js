(function () {
	var requestAnimationFrame =
		window.requestAnimationFrame ||
		function (fn) {
			return setTimeout(fn, 1000 / 60);
		};

	var cancelAnimationFrame = window.cancelAnimationFrame || clearTimeout;

	function move(ele, attr, targetVal, speed) {
		var CSSdom = ele.currentStyle || getComputedStyle(ele),
			startVal = parseFloat(CSSdom[attr]) || 0,
			targetVal = parseFloat(targetVal),
			bool = targetVal > startVal,
			speed = bool ? speed : -speed;

		function m() {
			startVal += speed;

			var ifEnd = bool ? startVal >= targetVal : startVal <= targetVal;

			ifEnd && (startVal = targetVal);

			ele.style[attr] = startVal + 'px';

			!ifEnd && requestAnimationFrame(m);
		}

		requestAnimationFrame(m);
	}

	window.move = move;
})();
