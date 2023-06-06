
interface Memo {
  memo: any;
  dependencies: any[];
  isMounted: boolean;
}

let hookMemos: Memo[] = [];
let hookIndices: number[] = [];

function useMemo(factory: () => any, dependencies: any[]) {
  let hookIndex = hookIndices[hookIndices.length - 1] || 0;
  
  if (!hookMemos[hookIndex]) {
    // 初始化
    let newMemo = factory();
    hookMemos[hookIndex] = {
      memo: newMemo,
      dependencies,
      isMounted: true
    };
  } else {
    let lastMemo = hookMemos[hookIndex];
    
    let sameDependencies = lastMemo.dependencies.every((d, i) => d === dependencies[i]);

    if (sameDependencies && lastMemo.isMounted) {
      // 依赖没有变化,返回上一次的 memo
      return lastMemo.memo;
    } else {
      // 依赖变化或是卸载后重新计算 memo
      let newMemo = factory();
      hookMemos[hookIndex] = {
        memo: newMemo,
        dependencies,
        isMounted: true
      };
    }
  }
  
  if (hookMemos[hookIndex].isMounted) {
    // 首次挂载返回 memo
    return hookMemos[hookIndex].memo;
  }

  hookIndices.push(++hookIndex);
  
  function unmount() {
    hookMemos[hookIndex].isMounted = false;
  }
  
  return unmount;
}




