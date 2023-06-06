function deepClone(origin, hasMap = new WeakMap()) {
    // 1. 判断是否为空或如果不是引用值 则返回
    if (origin === undefined || typeof origin !== 'object') return origin;

    // 2. 判断是否为 Date(时间) 或 RegExp(正则)
    if (origin instanceof Date) return new Date(origin);
    if (origin instanceof RegExp) return new RegExp(origin);

    const originKey = hasMap.get(origin);
    if (originKey) { return origin }

    const target = new origin.constructor();

    hasMap.set(origin, target);

    for (const key in origin) {
        if (origin.hasOwnProperty(key)) {
            target[key] = deepClone(origin[key], hasMap);
        }
    }

    return target;
}
