let hookCallbacks: Record<number, {
  callback: (...args: any[]) => any
  prevDependencies: any[]
}> = {};
let hookIndex = 0;

function useCallback<T extends (...args: any[]) => any>(
  callback: T, 
  dependencies: any[]
): [T, () => void] {
  let prevDependencies = hookCallbacks[hookIndex]?.prevDependencies;
  let sameDependencies = prevDependencies?.every((d, i) => d === dependencies[i]);
  
  if (sameDependencies) {
    return [hookCallbacks[hookIndex].callback, () => {}] as [T, () => void];
  }
  
  let memoizedCallback = callback;
  
  hookCallbacks[hookIndex] = {
    callback: memoizedCallback,
    prevDependencies: dependencies
  };
  
  function refreshCallback() {
    hookCallbacks[hookIndex].callback = callback;
  }
  
  hookIndex++;
  
  return [memoizedCallback, refreshCallback] as [T, () => void];
}


// =========== 概念详解 =============

/* Process:
1. 使用对象存储 callback 缓存,键值为 hookIndex,方便查找和管理。
2. 添加 prevDependencies 属性存储上一次 dependencies,用于避免重复执行 callback。
3. 返回 refreshCallback 函数手动刷新 memoizedCallback。
4. 添加 hookIndex 索引进行内部管理。
5. 使用 more semantic 的变量名 memoizedCallback 代替 lastCallback。
6. 第一次调用时同样会执行并返回 callback,与 React useCallback 行为一致。
*/

/* TS:
1. 使用 Record<number, Obj> 类型定义 hookCallbacks,键值为 number,值类型为 Obj。
2. Obj 中定义 callback 和 prevDependencies 的类型。
3. 使用函数泛型 T extends (...args: any[]) => any 定义 callback 的类型。
4. 返回值通过 as 断言声明类型 [T, () => void]。
*/