import _extends from "babel-runtime/helpers/extends";
import ReactDOM from "react-dom";
import scrollIntoView from "dom-scroll-into-view";
import has from "lodash/has";
import createBaseForm from "./createBaseForm";
import { mixin as formMixin } from "./createForm";
import { getParams } from "./utils";

// 获取样式属性值
function computedStyle(el, prop) {
  var getComputedStyle = window.getComputedStyle;
  var style =
    // If we have getComputedStyle
    getComputedStyle
      ? // Query it
        // TODO: From CSS-Query notes, we might need (node, null) for FF
        getComputedStyle(el)
      : // Otherwise, we are in IE and use currentStyle
        el.currentStyle;
  if (style) {
    //获取样式属性值
    return style[
      // Switch to camelCase for CSSOM
      // DEV: Grabbed from jQuery
      // https://github.com/jquery/jquery/blob/1.9-stable/src/css.js#L191-L194
      // https://github.com/jquery/jquery/blob/1.9-stable/src/core.js#L593-L597
      prop.replace(/-(\w)/gi, function (word, letter) {
        // 比如 margin-left 变成 marginLeft
        return letter.toUpperCase(); // 变成大写
      })
    ];
  }
  return undefined;
}

//得到可滚动的容器
function getScrollableContainer(n) {
  var node = n;
  var nodeName = void 0;
  /* eslint no-cond-assign:0 */
  while ((nodeName = node.nodeName.toLowerCase()) !== "body") {
    // 获取样式属性值
    var overflowY = computedStyle(node, "overflowY");
    // https://stackoverflow.com/a/36900407/3040605
    if (
      node !== n &&
      (overflowY === "auto" || overflowY === "scroll") && // 如果css属性设置了 可以滚动 属性
      node.scrollHeight > node.clientHeight //并且滚动的高 大于 可视的高 此时 会出现滚动条
    ) {
      return node;
    }
    // 否则一直找上一个父节点
    node = node.parentNode;
  }
  // 知道父节点是body标签为止，返回dom
  return nodeName === "body" ? node.ownerDocument : node;
}

var mixin = {
  // 获取form 表单
  getForm: function getForm() {
    return _extends({}, formMixin.getForm.call(this), {
      validateFieldsAndScroll: this.validateFieldsAndScroll,
    });
  },
  validateFieldsAndScroll: function validateFieldsAndScroll(ns, opt, cb) {
    var _this = this;

    var _getParams = getParams(ns, opt, cb),
      names = _getParams.names,
      callback = _getParams.callback,
      options = _getParams.options;

    var newCb = function newCb(error, values) {
      if (error) {
        var validNames = _this.fieldsStore.getValidFieldsName();
        var firstNode = void 0;
        var firstTop = void 0;

        validNames.forEach(function (name) {
          if (has(error, name)) {
            var instance = _this.getFieldInstance(name);
            if (instance) {
              var node = ReactDOM.findDOMNode(instance);
              var top = node.getBoundingClientRect().top;
              if (
                node.type !== "hidden" &&
                (firstTop === undefined || firstTop > top)
              ) {
                firstTop = top;
                firstNode = node;
              }
            }
          }
        });

        if (firstNode) {
          var c = options.container || getScrollableContainer(firstNode);
          scrollIntoView(
            firstNode,
            c,
            _extends(
              {
                onlyScrollIfNeeded: true,
              },
              options.scroll
            )
          );
        }
      }

      if (typeof callback === "function") {
        callback(error, values);
      }
    };

    return this.validateFields(names, options, newCb);
  },
};

// 创建DomForm
function createDOMForm(option) {
  return createBaseForm(_extends({}, option), [mixin]);
}

export default createDOMForm;
