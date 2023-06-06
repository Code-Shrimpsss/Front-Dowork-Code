class EventEmitter {
    constructor() {
        this.cache = {}
    }

    on(name, fn) {
        const tasks = this.cache[name]
        tasks ? this.cache[name].push(fn) : this.cache[name] = [fn]
    }

    off(name, fn) {
        const tasks = this.cache[name];
        if (task) {
            const index = tasks.findIndex(item => item === fn);
            if (index >= 0) this.cache[name].splice(index, 1)
        }
    }
    emit(name, ...args) {
        // 复制一份。防止回调里继续on，导致死循环
        const tasks = this.cache[name].slice()
        if (tasks) {
            for (let fn of tasks) {
                fn(...args)
            }
        }
    }

    once(name, cb) {
        function fn(...args) {
            cb(args)
            this.off(name, fn)
        }
        this.on(name, fn)
    }

}