//继承拷贝函数
import _extends from "babel-runtime/helpers/extends";
import hoistStatics from "hoist-non-react-statics";
import warning from "warning";

function getDisplayName(WrappedComponent) {
  return (
    WrappedComponent.displayName || WrappedComponent.name || "WrappedComponent"
  );
}

//在HOC中Component上面绑定的Static方法会丢失
// 这里有一个解决方法，就是hoist-non-react-statics组件
// WrappedComponent 子组件
// 详细说明 https://segmentfault.com/a/1190000008112017?_ea=1553893
export function argumentContainer(Container, WrappedComponent) {
  /* eslint no-param-reassign:0 */
  Container.displayName = "Form(" + getDisplayName(WrappedComponent) + ")";
  Container.WrappedComponent = WrappedComponent;
  return hoistStatics(Container, WrappedComponent);
}

// 拷贝返回一个新的对象
export function identity(obj) {
  return obj;
}

//变成一个真正的数组
export function flattenArray(arr) {
  return Array.prototype.concat.apply([], arr);
}

// 树 把一个数组对象点平化 也有校验 字段是否存在 功能
export function treeTraverse() {
  // 第一个参数
  var path =
    arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  //第二个参数
  var tree = arguments[1];
  // 第三个参数
  var isLeafNode = arguments[2];
  // 第四个参数
  var errorMessage = arguments[3];
  // 第五个参数
  var callback = arguments[4];
  console.log("isLeafNode=", isLeafNode);
  // 退出递归循环的条件
  /*
   //检查obj实例是否是Field的构造函数 isFormField
   // flattenFields  // 获取循环的字段判断是否存在当前的字段中 有校验作用
  */
  if (isLeafNode(path, tree)) {
    //
    //
    callback(path, tree);
  } else if (tree === undefined || tree === null) {
    // Do nothing
  } else if (Array.isArray(tree)) {
    // 如果树是数组
    tree.forEach(function (subTree, index) {
      // 递归
      return treeTraverse(
        path + "[" + index + "]",
        subTree,
        isLeafNode,
        errorMessage,
        callback
      );
    });
  } else {
    // debugger;
    // It's object and not a leaf node
    //它是对象而不是叶节点
    if (typeof tree !== "object") {
      warning(false, errorMessage);
      return;
    }
    console.log("tree==", tree);
    // 如果是对象
    // 获取对象属性 fieldKey
    Object.keys(tree).forEach(function (subTreeKey) {
      var subTree = tree[subTreeKey];
      console.log("subTree=", subTree);
      console.log("subTreeKey=", "" + path + (path ? "." : "") + subTreeKey);
      // 递归
      treeTraverse(
        "" + path + (path ? "." : "") + subTreeKey,
        subTree,
        isLeafNode,
        errorMessage,
        callback
      );
    });
  }
}

// 点平化 字段   树 把一个数组对象点平化 也有校验 字段是否存在 功能
export function flattenFields(maybeNestedFields, isLeafNode, errorMessage) {
  console.log("maybeNestedFields=", maybeNestedFields);
  console.log("isLeafNode=", isLeafNode);
  console.log("errorMessage=", errorMessage);

  var fields = {};
  treeTraverse(
    undefined,
    maybeNestedFields,
    isLeafNode,
    errorMessage,
    function (path, node) {
      fields[path] = node;
    }
  );
  return fields;
}
//  获取验证规则
export function normalizeValidateRules(validate, rules, validateTrigger) {
  var validateRules = validate.map(function (item) {
    var newItem = _extends({}, item, {
      trigger: item.trigger || [],
    });
    if (typeof newItem.trigger === "string") {
      newItem.trigger = [newItem.trigger];
    }
    return newItem;
  });
  console.log("validateRules=", validateRules);
  if (rules) {
    validateRules.push({
      trigger: validateTrigger ? [].concat(validateTrigger) : [],
      rules: rules,
    });
  }
  console.log("validateTrigger=", validateTrigger);
  console.log("validateRules=", validateRules);
  return validateRules;
}
//得到所有的验证触发器
export function getValidateTriggers(validateRules) {
  return validateRules
    .filter(function (item) {
      //过滤数据
      return !!item.rules && item.rules.length;
    })
    .map(function (item) {
      //只要获取trigger 一般为change
      return item.trigger;
    })
    .reduce(function (pre, curr) {
      // 连接数组
      return pre.concat(curr);
    }, []);
}
//从事件中获取值
export function getValueFromEvent(e) {
  console.log('e===========',e)
  console.log('e.target===========',e.target)
  // To support custom element
  if (!e || !e.target) {
    return e;
  }
  var target = e.target;

  return target.type === "checkbox" ? target.checked : target.value;
}
// 得到错误信息
export function getErrorStrs(errors) {
  if (errors) {
    return errors.map(function (e) {
      if (e && e.message) {
        return e.message;
      }
      return e;
    });
  }
  return errors;
}
// 得到参数，格式化整理转义参数
export function getParams(ns, opt, cb) {
  // 名称
  var names = ns;
  // 选项属性
  var options = opt;
  // 回调函数
  var callback = cb;
  // 如果回调函数不存在的情况下
  if (cb === undefined) {
    // 如果names是个函数
    if (typeof names === "function") {
      //只有一个参数并且是回调函数
      callback = names;
      options = {};
      names = undefined;
    } else if (Array.isArray(names)) {
      // 如果 names 是一个数组    第二个参数是一个回调函数的时候
      if (typeof options === "function") {
        callback = options;
        options = {};
      } else {
        // 如果第二个参数不是函数
        options = options || {};
      }
    } else {
      // 如果第二个参数是一个函数 并且第一个参数是一个对象的时候
      callback = options;
      options = names || {};
      names = undefined;
    }
  }
  // 返回三个值
  return {
    names: names,
    options: options,
    callback: callback,
  };
}

//判断对象是否是空对象
export function isEmptyObject(obj) {
  return Object.keys(obj).length === 0;
}
//校验规则
export function hasRules(validate) {
  if (validate) {
    // 只要有一个真的就返回真
    return validate.some(function (item) {
      return item.rules && item.rules.length;
    });
  }
  return false;
}
//判断 prefix 出现位置是索引是不是等于0
export function startsWith(str, prefix) {
  //第二个参数是索引的长度

  return str.lastIndexOf(prefix, 0) === 0;
}
