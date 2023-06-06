// ES5

let target = { a: 111, b: 222 }

function MyProxy(target, handler) {
	var _target = deepClone(target)

	Object.keys(_target).forEach((key) => {
		Object.defineProperty(_target, key, {
			get() {
				return handler.get && handler.get(target, key)
			},
			set(newVal) {
				handler.set && handler.set(target, key, newVal)
			},
		})
	})

	function deepClone(org, tar) {
		var tar = tar || {},
			toStr = Object.prototype.toString,
			arrType = '[object Array]'

		for (const key in org) {
			if (Object.hasOwnProperty(key)) {
				if (typeof org[key] === 'object' && org[key] !== null) {
					tar[key] = toStr.call(org[key]) === arrType ? [] : {}
					deepClone(org[key], tar[key])
				} else {
					tar[key] = org[key]
				}
			}
		}
		return tar
	}
}

var p = new MyProxy(target, {
	get: function (target, params) {
		console.log('get', target)
		return
	},
	set: function (target, params, value) {
		console.log('set', value)
		return
	},
})

p.b = 1212
