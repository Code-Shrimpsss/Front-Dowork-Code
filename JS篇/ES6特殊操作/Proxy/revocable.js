// revoke是Proxy内部的拦截方法

// let target = {};
// let handler = {};
// let { proxy, revoke } = Proxy.revocable(target, handler);
// proxy.foo = 123;
// proxy.foo // 123
// revoke();
// proxy.foo // TypeError: Revoked
