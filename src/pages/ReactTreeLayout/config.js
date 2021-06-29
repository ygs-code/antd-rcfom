function checkOneToManyNode(originNodeList = [], newNode) {
  //   新节点的父节点key
  const { parentKey } = newNode;

  if (originNodeList.length === 0) {
    // 添加第一个节点
    return {
      oneToMany: false,
      insertIndex: 1,
      count: 0,
      firstNode: true,
    };
  }

  // 添加非第一个节点

  let brotherNodeIndex = 0;
  let brotherCount = 0;

  // 检测旧节点数据中是否含有与新节点parentKey一样的节点(一对一或者一对多)
  const filterList = originNodeList.filter((item, index) => {
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
      firstNode: originNodeList.length === 1 ? true : false,
    };
  } else if (filterList.length) {
    // 新增节点已存在兄弟节点
    return {
      oneToMany: false,
      insertIndex: brotherNodeIndex === 0 ? 1 : brotherNodeIndex,
      count: brotherCount,
      firstNode: originNodeList.length === 1 ? true : false,
    };
  } else {
    // 异常数据
    return {
      oneToMany: false,
      insertIndex: brotherNodeIndex === 0 ? 1 : brotherNodeIndex,
      count: brotherCount,
      firstNode: originNodeList.length === 1 ? true : false,
    };
  }
}

function oneToOneNode(originNodeList = [], newNode) {
  if (originNodeList.length === 1) {
    // 添加第一个节点
    return {
      insertIndex: 1,
      count: 0,
      firstNode: true,
    };
  }
  //   新节点的父节点key
  const { parentKey } = newNode;

  const insertIndex = originNodeList.findIndex(
    (item) => item.parentKey === parentKey
  );
  const brotherCount = originNodeList.length - 1;
  return { insertIndex, count: brotherCount, firstNode: false };
}

export { checkOneToManyNode, oneToOneNode };
