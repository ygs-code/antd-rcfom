function checkOneToManyNode(oldNodeList = [], newNode) {
  //  新节点的父节点key
  const { parentKey } = newNode;
  let brotherNodeIndex = 0;
  let brotherCount = 0;
  // 检测旧节点数据中是否含有与新节点parentKey一样的节点(一对一或者一对多)
  const filterList = oldNodeList.filter((item, index) => {
    if (item.key === parentKey || item.parentKey === parentKey) {
      if (item.parentKey === parentKey) {
        brotherNodeIndex = index + 1;
        brotherCount += 1;
      }
      return true;
    } else {
      return false;
    }
  });
  if (filterList.length === 1) {
    // 新增节点没有兄弟节点
    return {
      oneToMany: false,
      insertIndex: brotherNodeIndex === 0 ? 1 : brotherNodeIndex,
      count: brotherCount,
    };
  } else if (filterList.length) {
    // 新增节点已存在兄弟节点
    return {
      oneToMany: true,
      insertIndex: brotherNodeIndex === 0 ? 1 : brotherNodeIndex,
      count: brotherCount,
    };
  } else {
    // 异常数据
    return {
      oneToMany: false,
      insertIndex: brotherNodeIndex === 0 ? 1 : brotherNodeIndex,
      count: brotherCount,
    };
  }
}

export { checkOneToManyNode };
