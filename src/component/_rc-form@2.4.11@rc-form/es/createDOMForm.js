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
  // 获取form 表单  对象
  getForm: function getForm() {
    /*
      getFieldsValue: this.fieldsStore.getFieldsValue, // 获取字段值得函数
      getFieldValue: this.fieldsStore.getFieldValue, // 获取单个值得函数
      getFieldInstance: this.getFieldInstance, // 获取字段实例
      setFieldsValue: this.setFieldsValue, // 设置字段值
      setFields: this.setFields, // 设置字段 新的值
      setFieldsInitialValue: this.fieldsStore.setFieldsInitialValue, // 设置初始化值的函数
      getFieldDecorator: this.getFieldDecorator, // 用于和表单进行双向绑定，详见下方描述 装饰组件，促进双向绑定的修饰器
      getFieldProps: this.getFieldProps, // 创建待验证的表单 设置字段元数据，返回 计算被修饰组件的属性
      getFieldsError: this.fieldsStore.getFieldsError, //获取一组输入控件的 Error ，如不传入参数，则获取全部组件的 Error
      getFieldError: this.fieldsStore.getFieldError, //获取某个输入控件的 Error
      isFieldValidating: this.fieldsStore.isFieldValidating, //判断一个输入控件是否在校验状态
      isFieldsValidating: this.fieldsStore.isFieldsValidating, // 判断字段是否在校验中
      isFieldsTouched: this.fieldsStore.isFieldsTouched, //判断是否任一输入控件经历过 getFieldDecorator 的值收集时机 options.trigger
      isFieldTouched: this.fieldsStore.isFieldTouched, //判断一个输入控件是否经历过 getFieldDecorator 的值收集时机 options.trigger
      isSubmitting: this.isSubmitting, // 是否在 提交状态
      submit: this.submit, // 表单提交函数
      validateFields: this.validateFields, //验证字段,返回promise 校验并获取一组输入域的值与 Error，若 fieldNames 参数为空，则校验全部组件
      resetFields: this.resetFields, // 重置字段
    */
    return _extends({}, formMixin.getForm.call(this), {
      validateFieldsAndScroll: this.validateFieldsAndScroll,
    });
  },
  //与 validateFields 相似，但校验完后，如果校验不通过的菜单域不在可见范围内，则自动滚动进可见范围
  validateFieldsAndScroll: function validateFieldsAndScroll(ns, opt, cb) {
    var _this = this;
    // 得到参数，格式化整理转义参数
    var _getParams = getParams(ns, opt, cb),
      names = _getParams.names,
      callback = _getParams.callback,
      options = _getParams.options;

    var newCb = function newCb(error, values) {
      if (error) {
        // 获取所有字段的名称，不包含 含有hidden 属性的字段
        var validNames = _this.fieldsStore.getValidFieldsName();
        var firstNode = void 0;
        var firstTop = void 0;
        // 循环字段名称
        validNames.forEach(function (name) {
          if (has(error, name)) {
            // 获取字段实例 也可以理解是组件
            var instance = _this.getFieldInstance(name);
            if (instance) {
              //如果实例存在 那么获取真实的dom
              var node = ReactDOM.findDOMNode(instance);
              // 返回可视窗口到dom 元素的 top值
              var top = node.getBoundingClientRect().top;
              //
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
