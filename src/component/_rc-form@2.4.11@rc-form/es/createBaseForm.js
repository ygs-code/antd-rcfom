import _objectWithoutProperties from "babel-runtime/helpers/objectWithoutProperties";
import _defineProperty from "babel-runtime/helpers/defineProperty";
import _extends from "babel-runtime/helpers/extends";
// 数组去重
import _toConsumableArray from "babel-runtime/helpers/toConsumableArray";
/* eslint-disable react/prefer-es6-class */
/* eslint-disable prefer-promise-reject-errors */

import React from "react";
//如果你不使用 ES6 ，你可以使用 create-react-class 方法代替： 用es5 创建一个 react 组件
import createReactClass from "create-react-class";
import unsafeLifecyclesPolyfill from "rc-util/es/unsafeLifecyclesPolyfill";
import AsyncValidator from "async-validator";
import warning from "warning";
import get from "lodash/get";
import set from "lodash/set";
// 判断两个值是否相等
import eq from "lodash/eq";
// 实例化一个字段存储
import createFieldsStore from "./createFieldsStore";
import {
  //在HOC中Component上面绑定的Static方法会丢失
  // 这里有一个解决方法，就是hoist-non-react-statics组件
  // WrappedComponent 子组件
  // 详细说明 https://segmentfault.com/a/1190000008112017?_ea=1553893
  argumentContainer,
  // 拷贝返回一个新的对象
  identity,
  // 获取验证规则
  normalizeValidateRules,
  //得到所有的验证触发器
  getValidateTriggers,
  //从事件中获取值
  getValueFromEvent,
  //校验规则
  hasRules,
  // 得到参数，格式化整理转义参数
  getParams,
  //判断对象是否是空对象
  isEmptyObject,
  //变成一个真正的数组
  flattenArray,
} from "./utils";

var DEFAULT_TRIGGER = "onChange";
//创建表单
function createBaseForm(option, mixins) {
  //获取 option参数
  option =
    arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  mixins =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  var validateMessages = option.validateMessages, //校验信息
    onFieldsChange = option.onFieldsChange, //当字段更改时调用，可以将字段分派到redux存储区。
    onValuesChange = option.onValuesChange, // 值改变时调用。
    _option$mapProps = option.mapProps, //将新props转移到WrappedComponent。
    mapProps = _option$mapProps === undefined ? identity : _option$mapProps, // 返回一个新的对象
    mapPropsToFields = option.mapPropsToFields, //将值从props转换到字段。用于从redux存储区读取字段。
    fieldNameProp = option.fieldNameProp, //在哪里存储getfieldprops的参数。 获取表单的create name
    fieldMetaProp = option.fieldMetaProp, //在哪里存储getfieldprops的元数据。
    fieldDataProp = option.fieldDataProp, //在哪里存储字段数据
    _option$formPropName = option.formPropName,
    formPropName =
      _option$formPropName === undefined ? "form" : _option$formPropName,
    formName = option.name, // 表单名称
    withRef = option.withRef; //为包装的组件实例userefs维护一个ref。wrappedComponentto访问。

  // 封装高阶组件，为下游WrappedComponent组件注入this.props.form工具函数集等
  return function decorate(
    WrappedComponent //组件传入进来
  ) {
    // 创建一个组件
    var Form = createReactClass({
      displayName: "Form",
      // 添加拓展参数
      mixins: mixins,
      // 初始化 state 生命周期
      getInitialState: function getInitialState() {
        var _this = this;

        var fields = mapPropsToFields && mapPropsToFields(this.props); //  存储表单项的值，错误文案等即时数据，重绘表单时props从this.fields取值
        console.log("fields=", fields);
        // debugger;
        // 创建字段仓库
        this.fieldsStore = createFieldsStore(fields || {});

        this.instances = {}; // 字段实例存储
        this.cachedBind = {}; // 存储getFieldProps、getFieldDecorator方法经过数据处理后的原始配置值，{name:options}形式
        this.clearedFieldMetaCache = {}; // 清除字段缓存

        this.renderFields = {};
        this.domFields = {};

        // HACK: https://github.com/ant-design/ant-design/issues/6406
        // 为构造方法添加以下方法
        [
          "getFieldsValue", // 获取字段值的函数
          "getFieldValue", // 获取字段值的函数
          "setFieldsInitialValue", // 设置字段值的函数
          "getFieldsError", //  获取一组输入控件的 Error ，如不传入参数，则获取全部组件的
          "getFieldError", //	获取某个输入控件的 Error
          "isFieldValidating", //判断一个输入控件是否在校验状态
          "isFieldsValidating", //判断控件是否在校验状态
          "isFieldsTouched", //  判断是否任一输入控件经历过 getFieldDecorator 的值收集时机 options.trigger
          "isFieldTouched", //判断一个输入控件是否经历过 getFieldDecorator 的值收集时机 options.trigger
        ].forEach(function (key) {
          _this[key] = function () {
            // 字段存储
            var _fieldsStore;

            if (process.env.NODE_ENV !== "production") {
              warning(
                false,
                "you should not use `ref` on enhanced form, please use `wrappedComponentRef`. " +
                  "See: https://github.com/react-component/form#note-use-wrappedcomponentref-instead-of-withref-after-rc-form140"
              );
            }
            return (_fieldsStore = _this.fieldsStore)[key].apply(
              _fieldsStore,
              arguments
            );
          };
        });

        return {
          submitting: false,
        };
      },
      // react 生命周期 完成首次加载组件之后回调
      componentDidMount: function componentDidMount() {
        // 清理无用的字段
        this.cleanUpUselessFields();
      },
      // 表单重绘时，通过mapPropsToFields从props中获取数据注入this.fields
      componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        if (mapPropsToFields) {
          // 更新字段
          this.fieldsStore.updateFields(mapPropsToFields(nextProps));
        }
      },
      componentDidUpdate: function componentDidUpdate() {
        // 清理无用的字段
        this.cleanUpUselessFields();
      },
      // 收集 字段对象
      onCollectCommon: function onCollectCommon(name, action, args) {
        // 获取单个字段的value值
        var fieldMeta = this.fieldsStore.getFieldMeta(name);
        if (fieldMeta[action]) {
          // 执行方法
          fieldMeta[action].apply(
            fieldMeta,
            // 数组去重
            _toConsumableArray(args)
          );
        } else if (
          //原始的道具
          fieldMeta.originalProps &&
          //原始的道具
          fieldMeta.originalProps[action]
        ) {
          var _fieldMeta$originalPr;

          (_fieldMeta$originalPr = fieldMeta.originalProps)[action].apply(
            _fieldMeta$originalPr,
            // 数组去重
            _toConsumableArray(args)
          );
        }
        //从事件中获取值
        var value = fieldMeta.getValueFromEvent
          ? fieldMeta.getValueFromEvent.apply(
              fieldMeta,
              // 数组去重
              _toConsumableArray(args)
            )
          : getValueFromEvent.apply(
              undefined,
              // 数组去重
              _toConsumableArray(args)
            );
        // 如果表单有传递onValuesChange 函数进来 则触发
        if (onValuesChange && value !== this.fieldsStore.getFieldValue(name)) {
          // 获取所有值
          var valuesAll = this.fieldsStore.getAllValues();
          var valuesAllSet = {};
          valuesAll[name] = value;
          // 循环所有值
          Object.keys(valuesAll).forEach(function (key) {
            //设置值
            return set(valuesAllSet, key, valuesAll[key]);
          });
          // 更新值
          onValuesChange(
            // 浅拷贝
            _extends(
              _defineProperty({}, formPropName, this.getForm()),
              this.props
            ),
            // 设置值
            set({}, name, value),
            // 原来所有值对象
            valuesAllSet
          );
        }
        // 获取字段
        var field = this.fieldsStore.getField(name);
        return {
          // 字段名称
          name: name,
          // 合并新的字段
          field: _extends({}, field, { value: value, touched: true }),
          // 字段存储对象
          fieldMeta: fieldMeta,
        };
      },
      // 收集设置字段
      onCollect: function onCollect(name_, action) {
        for (
          var _len = arguments.length, // 获取参数长度
            args = Array(_len > 2 ? _len - 2 : 0), // 声明 args 变量
            _key = 2; // 声明key
          _key < _len;
          _key++
        ) {
          // 如果参数大于2的时候 args 减去前面两个参数
          args[_key - 2] = arguments[_key];
        }
        // 收集 字段对象
        var _onCollectCommon = this.onCollectCommon(name_, action, args),
          name = _onCollectCommon.name, // 字段名称
          field = _onCollectCommon.field, //字段
          fieldMeta = _onCollectCommon.fieldMeta; //字段存储对象

        var validate = fieldMeta.validate; //字段校验规则

        // 检查校验字段 标志dirty 为true
        this.fieldsStore.setFieldsAsDirty();

        var newField = _extends({}, field, {
          //校验规则
          dirty: hasRules(validate),
        });
        // 设置字段
        this.setFields(_defineProperty({}, name, newField));
      },
      // 收集验证
      onCollectValidate: function onCollectValidate(name_, action) {
        for (
          var _len2 = arguments.length,
            args = Array(_len2 > 2 ? _len2 - 2 : 0),
            _key2 = 2;
          _key2 < _len2;
          _key2++
        ) {
          // 收集大于2个参数组成数组存放在args数组中
          args[_key2 - 2] = arguments[_key2];
        }
        // 收集 字段对象
        var _onCollectCommon2 = this.onCollectCommon(name_, action, args),
          // 获取字段
          field = _onCollectCommon2.field,
          // 获取字段存储的对象
          fieldMeta = _onCollectCommon2.fieldMeta;
        // 新的字段
        var newField = _extends({}, field, {
          dirty: true, //检查校验字段 标志dirty 为true
        });
        // 检查校验字段 标志dirty 为true
        this.fieldsStore.setFieldsAsDirty();
        //内部验证字段
        this.validateFieldsInternal([newField], {
          action: action,
          options: {
            firstFields: !!fieldMeta.validateFirst,
          },
        });
      },
      // 组件事件绑定等收集
      getCacheBind: function getCacheBind(name, action, fn) {
        // 判断有没有绑定缓存，如果没有则先给一个空的对象
        if (!this.cachedBind[name]) {
          this.cachedBind[name] = {};
        }
        // 获取缓存
        var cache = this.cachedBind[name];
        //如果获取不到缓存那么就设置缓存
        if (!cache[action] || cache[action].oriFn !== fn) {
          cache[action] = {
            fn: fn.bind(this, name, action),
            oriFn: fn,
          };
        }
        //返回缓存中的fn函数
        return cache[action].fn;
      },
      // 用于和表单进行双向绑定，详见下方描述 装饰组件，促进双向绑定的修饰器
      getFieldDecorator: function getFieldDecorator(
        name, // 字段名称
        fieldOption // 字段设置参数
      ) {
        var _this2 = this;
        // 创建待验证的表单 设置字段元数据，返回 计算被修饰组件的属性
        var props = this.getFieldProps(name, fieldOption);
        return function (
          fieldElem // 组件 也可以理解为react 的 vnode 虚拟dom
        ) {
          // We should put field in record if it is rendered 如果字段被渲染，我们应该把它放在record中
          _this2.renderFields[name] = true;
          // 获取初始化对象值
          var fieldMeta = _this2.fieldsStore.getFieldMeta(name);
          var originalProps = fieldElem.props; // 获取组件属性
          // 如果不是上产环境 其实我们可以忽略警告日志
          if (process.env.NODE_ENV !== "production") {
            // value 属性
            var valuePropName = fieldMeta.valuePropName;
            // 警告 不能私自设置 value 属性 因为将会被getFieldDecorator 的value 覆盖
            warning(
              !(valuePropName in originalProps), //
              "`getFieldDecorator` will override `" +
                valuePropName +
                "`, " +
                ("so please don't set `" + valuePropName + "` directly ") +
                "and use `setFieldsValue` to set it."
            );
            var defaultValuePropName =
              "default" +
              valuePropName[0].toUpperCase() +
              valuePropName.slice(1);
            warning(
              !(defaultValuePropName in originalProps),
              "`" +
                defaultValuePropName +
                "` is invalid " +
                ("for `getFieldDecorator` will set `" + valuePropName + "`,") +
                " please use `option.initialValue` instead."
            );
          }
          // 组件自身属性
          fieldMeta.originalProps = originalProps;
          console.log("fieldElem==", fieldElem);
          console.log("fieldElem.ref==", fieldElem.ref);
          debugger;
          fieldMeta.ref = fieldElem.ref; // 获取组件的ref
          console.log(" React.cloneElement=");
          // 克隆一个 组件
          console.log(
            React.cloneElement(
              fieldElem,
              // props 属性
              _extends(
                {},
                props,
                // 获取字段的value 值
                _this2.fieldsStore.getFieldValuePropValue(fieldMeta)
              )
            )
          );
          console.log(
            "getFieldValuePropValue=",
            // 获取字段的value 值
            _this2.fieldsStore.getFieldValuePropValue(fieldMeta)
          );
          return React.cloneElement(
            fieldElem, //原来的vnode
            // props 属性
            _extends(
              {},
              props, // 用户传进来的 props 属性
              // 获取value 属性值
              _this2.fieldsStore.getFieldValuePropValue(fieldMeta)
            )
          );
        };
      },
      // 创建待验证的表单 设置字段元数据，返回 计算被修饰组件的属性
      getFieldProps: function getFieldProps(name) {
        var _this3 = this;
        //用户字段参数选项 判断是否有一个参数
        var usersFieldOption =
          arguments.length > 1 && arguments[1] !== undefined
            ? arguments[1]
            : {};

        if (!name) {
          //必须调用' getFieldProps '与有效的名称字符串! 必须name 有值
          throw new Error("Must call `getFieldProps` with valid name string!");
        }
        // 如果不在生产环境
        if (process.env.NODE_ENV !== "production") {
          // 嵌套是否是可用的字段名
          warning(
            this.fieldsStore.isValidNestedFieldName(name), // 布尔值 如果为false 就打印日志
            //一个字段名不能是另一个字段名的一部分。“一个”和“a.b。”检查字段:
            "One field name cannot be part of another, e.g. `a` and `a.b`. Check field: " +
              name
          );
          warning(
            !("exclusive" in usersFieldOption), // 布尔值 如果为false 就打印日志
            //  option.exclusive 的 getFieldProps ' | ' getFieldDecorator 已被删除。
            "`option.exclusive` of `getFieldProps`|`getFieldDecorator`"
          );
        }
        // 删除字段缓存
        delete this.clearedFieldMetaCache[name];
        //获取字段选项参数
        var fieldOption = _extends(
          {
            name: name, // 字段名称
            trigger: DEFAULT_TRIGGER, //onChange 收集子节点的值的时机
            valuePropName: "value", // 字段value
            validate: [], // 验证 空数组
          },
          usersFieldOption //  字段选项参数
        );

        var rules = fieldOption.rules, // 字段验证规则
          trigger = fieldOption.trigger, //收集子节点的值的时机 change
          _fieldOption$validate = fieldOption.validateTrigger, //校验子节点值的时机
          validateTrigger =
            _fieldOption$validate === undefined
              ? trigger
              : _fieldOption$validate,
          validate = fieldOption.validate; //验证
        // 获取 字段的 存储对象 也可以理解为存储初始化对象
        var fieldMeta = this.fieldsStore.getFieldMeta(name);
        // 判断是否有初始化值
        if ("initialValue" in fieldOption) {
          // 如果没有重新赋值
          fieldMeta.initialValue = fieldOption.initialValue;
        }
        // 获取字段的value 值
        var inputProps = _extends(
          {},
          // 获取字段的value 值
          this.fieldsStore.getFieldValuePropValue(fieldOption),
          {
            //获取缓存绑定
            ref: this.getCacheBind(name, name + "__ref", this.saveRef),
          }
        );
        // 获取表单的create name 如果不存在则用当前字段name代替
        if (fieldNameProp) {
          inputProps[fieldNameProp] = formName ? formName + "_" + name : name;
        }
        console.log("validate=", validate);
        console.log("rules=", rules);
        console.log("validateTrigger=", validateTrigger);

        // 获取验证规则
        var validateRules = normalizeValidateRules(
          validate, // 空数组
          rules, // 校验 规则
          validateTrigger //校验子节点值的时机   //onChange 收集子节点的值的时机
        );
        //得到所有的验证触发器
        var validateTriggers = getValidateTriggers(validateRules);
        console.log("validateTriggers=", validateTriggers);
        validateTriggers.forEach(function (action) {
          if (inputProps[action]) return;
          //获取缓存绑定 change 事件
          inputProps[action] = _this3.getCacheBind(
            name,
            action,
            _this3.onCollectValidate
          );
        });

        // make sure that the value will be collect 确保该值将被收集
        if (trigger && validateTriggers.indexOf(trigger) === -1) {
          //获取缓存绑定 change
          inputProps[trigger] = this.getCacheBind(
            name,
            trigger,
            this.onCollect
          );
        }
        // 合并验证规则到fieldMeta 对象中
        var meta = _extends({}, fieldMeta, fieldOption, {
          validate: validateRules,
        });
        // 重新设置fieldMeta
        this.fieldsStore.setFieldMeta(name, meta);
        console.log("fieldMetaProp=", fieldMetaProp);
        // debugger;
        if (fieldMetaProp) {
          //该选项一般不会传递
          inputProps[fieldMetaProp] = meta;
        }

        if (fieldDataProp) {
          // 字段的props属性
          //忽略改选项
          inputProps[fieldDataProp] = this.fieldsStore.getField(name);
        }

        // This field is rendered, record it 记录是否被渲染
        this.renderFields[name] = true;
        // 返回组件属性
        console.log("inputProps=", inputProps);
        return inputProps;
      },
      // 获取字段实例
      getFieldInstance: function getFieldInstance(name) {
        return this.instances[name];
      },
      //获取得到验证规则
      getRules: function getRules(
        fieldMeta, // 字段存储对象
        action //校验规则
      ) {
        //获取校验规则
        var actionRules = fieldMeta.validate
          .filter(function (item) {
            return !action || item.trigger.indexOf(action) >= 0;
          })
          .map(function (item) {
            return item.rules;
          });
        // 变成一个真正数组
        return flattenArray(actionRules);
      },
      // 设置字段
      setFields: function setFields(maybeNestedFields, callback) {
        var _this4 = this;
        // console.log('this.fieldsStore.getNestedAllFields()=',this.fieldsStore.getNestedAllFields())
        //点平注册字段 判断传进来的字段是否在已经创建的字段中
        console.log("maybeNestedFields==========", maybeNestedFields);
        var fields = this.fieldsStore.flattenRegisteredFields(
          maybeNestedFields
        );
        console.log("setFields fields==========", fields);
        //   设置字段 新的值
        this.fieldsStore.setFields(fields);
        // 拓展参数如果有字段改变则触发， 如果有字段改变
        if (onFieldsChange) {
          // 获取 改变的字段
          var changedFields = Object.keys(fields).reduce(function (acc, name) {
            return set(acc, name, _this4.fieldsStore.getField(name));
          }, {});
          // 更新字段
          onFieldsChange(
            _extends(
              _defineProperty({}, formPropName, this.getForm()),
              this.props
            ),
            changedFields,
            this.fieldsStore.getNestedAllFields()
          );
        }
        // 强制更新 render
        this.forceUpdate(callback);
      },
      setFieldsValue: function setFieldsValue(
        // 改变的值 对象类型  {[key]:newValue}
        changedValues,
        // 回调函数
        callback
      ) {
        // 获取 原来的 字段存储数据
        var fieldsMeta = this.fieldsStore.fieldsMeta;
        console.log("changedValues==========", changedValues);
        //点平注册字段 判断传进来的字段是否在已经创建的字段中
        var values = this.fieldsStore.flattenRegisteredFields(changedValues);
        console.log("setFieldsValue values============", values);
        // 获取新的值
        var newFields = Object.keys(values).reduce(function (acc, name) {
          var isRegistered = fieldsMeta[name]; // 是否已经注册过
          console.log("isRegistered==", isRegistered);
          if (process.env.NODE_ENV !== "production") {
            warning(
              isRegistered, // 如果isRegistered 为假，则没有注册该字段 则发出警告日志
              "Cannot use `setFieldsValue` until " +
                "you use `getFieldDecorator` or `getFieldProps` to register it."
            );
          }
          if (isRegistered) {
            //是否已经注册过，如果已经注册过则重新设置值
            var value = values[name];
            acc[name] = {
              value: value, //新的值
            };
          }
          return acc; // 返回新的值
        }, {});
        // 设置字段 新的值
        this.setFields(newFields, callback);
        // 如果表单有传递onValuesChange 函数进来 则触发
        if (onValuesChange) {
          // 获取全部字段值的函数  返回是对象 {key:value} 数据形式
          var allValues = this.fieldsStore.getAllValues();
          // 更新值
          onValuesChange(
            _extends(
              _defineProperty({}, formPropName, this.getForm()),
              this.props
            ),
            changedValues, //新改变的值
            allValues //全部值
          );
        }
      },
      // 保存 ref
      saveRef: function saveRef(name, _, component) {
        // 如果组件不存在
        if (!component) {
          // 获取 字段的 _fieldMeta 对象
          var _fieldMeta = this.fieldsStore.getFieldMeta(name);
          // 保存
          if (!_fieldMeta.preserve) {
            // after destroy, delete data 销毁后，删除数据
            // 记录 销毁 FieldMetaCache 缓存，意思是记录该字段已经被销毁了
            this.clearedFieldMetaCache[name] = {
              field: this.fieldsStore.getField(name),
              meta: _fieldMeta,
            };
            // 清除字段Field
            this.clearField(name);
          }
          delete this.domFields[name];
          return;
        }

        this.domFields[name] = true;
        // 删除  记录销毁缓存 中的 Field 数据，并且重新设置 Field
        this.recoverClearedField(name);
        // 获取FieldMeta 对象
        var fieldMeta = this.fieldsStore.getFieldMeta(name);
        console.log("fieldMeta=", fieldMeta);

        if (fieldMeta) {
          // 获取ref
          var ref = fieldMeta.ref;
          if (ref) {
            if (typeof ref === "string") {
              //不可以设置ref 为字符串
              throw new Error("can not set ref string for " + name);
            } else if (typeof ref === "function") {
              // 如果ref 是函数
              ref(component);
            } else if (Object.prototype.hasOwnProperty.call(ref, "current")) {
              // 如果 ref 还有属性current
              ref.current = component;
            }
          }
        }
        // 记录组件的实例
        this.instances[name] = component;
      },
      // 清理无用的字段
      cleanUpUselessFields: function cleanUpUselessFields() {
        var _this5 = this;
        // 获取全部字段名称
        var fieldList = this.fieldsStore.getAllFieldsName();
        console.log("fieldList=", fieldList);
        var removedList = fieldList.filter(function (field) {
          var fieldMeta = _this5.fieldsStore.getFieldMeta(field);
          // 判断如果不存在renderFields 或者 domFields 或者 fieldMeta.preserve 为假的时候
          return (
            !_this5.renderFields[field] &&
            !_this5.domFields[field] &&
            !fieldMeta.preserve
          );
        });
        if (removedList.length) {
          // 循环需要清除的字段
          removedList.forEach(this.clearField);
        }
        this.renderFields = {};
      },
      // 清除字段Field
      clearField: function clearField(name) {
        // 清除字段
        this.fieldsStore.clearField(name);
        delete this.instances[name];
        delete this.cachedBind[name];
      },
      // 重置字段
      resetFields: function resetFields(ns) {
        var _this6 = this;
        // 重置值 但是  initialValue 没能重置 可能是一个bug  // 重置字段的值
        var newFields = this.fieldsStore.resetFields(ns);

        if (Object.keys(newFields).length > 0) {
          // 设置字段 重新设置值
          this.setFields(newFields);
        }
        if (ns) {
          var names = Array.isArray(ns) ? ns : [ns];
          names.forEach(function (name) {
            return delete _this6.clearedFieldMetaCache[name];
          });
        } else {
          // 清理缓存FieldMeta
          this.clearedFieldMetaCache = {};
        }
      },
      // 删除  记录销毁缓存 中的 Field 数据，并且重新设置 Field
      recoverClearedField: function recoverClearedField(name) {
        // 判断字段是否已经被销毁了
        if (this.clearedFieldMetaCache[name]) {
          //   重新设置字段 新的值
          this.fieldsStore.setFields(
            _defineProperty({}, name, this.clearedFieldMetaCache[name].field)
          );
          //重新设置 Meta 对象
          this.fieldsStore.setFieldMeta(
            name,
            this.clearedFieldMetaCache[name].meta
          );
          // 删除clearedFieldMetaCache 对象中记录的字段
          delete this.clearedFieldMetaCache[name];
        }
      },
      //字段内部验证字段
      validateFieldsInternal: function validateFieldsInternal(
        fields, //  需要校验的字段
        _ref,
        callback // 回调函数
      ) {
        var _this7 = this;

        var fieldNames = _ref.fieldNames, // 字段名称
          action = _ref.action, // 字段事件 一般为onchange
          _ref$options = _ref.options, //  getFieldDecorator 参数
          options = _ref$options === undefined ? {} : _ref$options;

        var allRules = {}; // 校验规则
        var allValues = {}; // 值
        var allFields = {}; //字段
        var alreadyErrors = {}; // 错误信息
        // 循环字段
        fields.forEach(function (field) {
          // 获取字段名称
          var name = field.name;
          if (options.force !== true && field.dirty === false) {
            // 字段错误信息
            if (field.errors) {
              // 如果有错误信息存起来
              set(alreadyErrors, name, { errors: field.errors });
            }
            return;
          }
          // 获取字段的Meta 对象
          var fieldMeta = _this7.fieldsStore.getFieldMeta(name);
          //浅拷贝字段
          var newField = _extends({}, field);
          //设置新的字段错误信息为undefined
          newField.errors = undefined;
          // 设置已经验证过
          newField.validating = true;

          newField.dirty = true;
          //获取得到验证规则
          allRules[name] = _this7.getRules(fieldMeta, action);
          // 获取值
          allValues[name] = newField.value;
          //字段名称
          allFields[name] = newField;
        });
        // 设置字段
        this.setFields(allFields);
        // in case normalize 以防正常化  获取全部值
        Object.keys(allValues).forEach(function (f) {
          // 获取值
          allValues[f] = _this7.fieldsStore.getFieldValue(f);
        });
        //判断对象是否是空对象
        if (callback && isEmptyObject(allFields)) {
          callback(
            isEmptyObject(alreadyErrors) ? null : alreadyErrors,
            // 字段值
            this.fieldsStore.getFieldsValue(fieldNames)
          );
          return;
        }
        // 异步验证
        var validator = new AsyncValidator(allRules);
        //整个表单校验信息
        if (validateMessages) {
          validator.messages(validateMessages);
        }
        validator.validate(
          allValues, // 全部值
          options, // 选项
          // 错误信息回调函数
          function (errors) {
            // 获取错误信息
            var errorsGroup = _extends({}, alreadyErrors);
            // 如果错误信息存在
            if (errors && errors.length) {
              // 循环错误信息
              errors.forEach(function (e) {
                //获取字段
                var errorFieldName = e.field;

                var fieldName = errorFieldName;

                // Handle using array validation rule. 句柄使用数组验证规则。
                // ref: https://github.com/ant-design/ant-design/issues/14275
                //如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测。
                Object.keys(allRules).some(function (ruleFieldName) {
                  var rules = allRules[ruleFieldName] || [];

                  // Exist if match rule 如果匹配规则存在
                  if (ruleFieldName === errorFieldName) {
                    fieldName = ruleFieldName;
                    return true;
                  }

                  // Skip if not match array type 如果不匹配数组类型，则跳过
                  if (
                    //如果全部元素满足条件，则表达式返回true ,
                    rules.every(function (_ref2) {
                      var type = _ref2.type;
                      return type !== "array";
                    }) ||
                    // 检查 xxx.
                    errorFieldName.indexOf(ruleFieldName + ".") !== 0
                  ) {
                    return false;
                  }

                  // Exist if match the field name 如果匹配字段名称，则存在
                  var restPath = errorFieldName.slice(ruleFieldName.length + 1);
                  if (/^\d+$/.test(restPath)) {
                    fieldName = ruleFieldName;
                    return true;
                  }

                  return false;
                });

                var field = get(errorsGroup, fieldName);
                if (typeof field !== "object" || Array.isArray(field)) {
                  // 记录错误字段
                  set(errorsGroup, fieldName, { errors: [] });
                }
                var fieldErrors = get(errorsGroup, fieldName.concat(".errors"));
                //收集错误信息
                fieldErrors.push(e);
              });
            }
            var expired = [];
            var nowAllFields = {};
            // 循环校验规则
            Object.keys(allRules).forEach(function (name) {
              //获取错误字段
              var fieldErrors = get(errorsGroup, name);
              // 获取当前字段
              var nowField = _this7.fieldsStore.getField(name);
              // avoid concurrency problems 避免并发问题
              //判断两个值是否相等
              if (!eq(nowField.value, allValues[name])) {
                // 如果不相等
                expired.push({
                  name: name,
                });
              } else {
                //如果相等
                nowField.errors = fieldErrors && fieldErrors.errors;
                nowField.value = allValues[name];
                nowField.validating = false;
                nowField.dirty = false;
                nowAllFields[name] = nowField;
              }
            });
            // 设置字段
            _this7.setFields(nowAllFields);
            if (callback) {
              //如果有值不相等，则需要重新校验一次
              if (expired.length) {
                expired.forEach(function (_ref3) {
                  var name = _ref3.name;

                  var fieldErrors = [
                    {
                      message: name + " need to revalidate", //需要重新验证
                      field: name,
                    },
                  ];
                  // 记录是否有错误信息
                  set(errorsGroup, name, {
                    expired: true,
                    errors: fieldErrors,
                  });
                });
              }
              // 回调函数
              callback(
                isEmptyObject(errorsGroup) ? null : errorsGroup,
                _this7.fieldsStore.getFieldsValue(fieldNames)
              );
            }
          }
        );
      },
      validateFields: function validateFields(ns, opt, cb) {
        var _this8 = this;

        var pending = new Promise(function (resolve, reject) {
          var _getParams = getParams(ns, opt, cb),
            names = _getParams.names,
            options = _getParams.options;

          var _getParams2 = getParams(ns, opt, cb),
            callback = _getParams2.callback;

          if (!callback || typeof callback === "function") {
            var oldCb = callback;
            callback = function callback(errors, values) {
              if (oldCb) {
                oldCb(errors, values);
              }
              if (errors) {
                reject({ errors: errors, values: values });
              } else {
                resolve(values);
              }
            };
          }
          var fieldNames = names
            ? _this8.fieldsStore.getValidFieldsFullName(names)
            : _this8.fieldsStore.getValidFieldsName();
          var fields = fieldNames
            .filter(function (name) {
              var fieldMeta = _this8.fieldsStore.getFieldMeta(name);
              //校验规则
              return hasRules(fieldMeta.validate);
            })
            .map(function (name) {
              var field = _this8.fieldsStore.getField(name);
              field.value = _this8.fieldsStore.getFieldValue(name);
              return field;
            });
          if (!fields.length) {
            callback(null, _this8.fieldsStore.getFieldsValue(fieldNames));
            return;
          }
          if (!("firstFields" in options)) {
            options.firstFields = fieldNames.filter(function (name) {
              var fieldMeta = _this8.fieldsStore.getFieldMeta(name);
              return !!fieldMeta.validateFirst;
            });
          }
          //内部验证字段
          _this8.validateFieldsInternal(
            fields,
            {
              fieldNames: fieldNames,
              options: options,
            },
            callback
          );
        });
        pending["catch"](function (e) {
          // eslint-disable-next-line no-console
          if (console.error && process.env.NODE_ENV !== "production") {
            // eslint-disable-next-line no-console
            console.error(e);
          }
          return e;
        });
        return pending;
      },
      isSubmitting: function isSubmitting() {
        if (
          process.env.NODE_ENV !== "production" &&
          process.env.NODE_ENV !== "test"
        ) {
          warning(
            false,
            "`isSubmitting` is deprecated. " +
              "Actually, it's more convenient to handle submitting status by yourself."
          );
        }
        return this.state.submitting;
      },
      submit: function submit(callback) {
        var _this9 = this;

        if (
          process.env.NODE_ENV !== "production" &&
          process.env.NODE_ENV !== "test"
        ) {
          warning(
            false,
            "`submit` is deprecated. " +
              "Actually, it's more convenient to handle submitting status by yourself."
          );
        }
        var fn = function fn() {
          _this9.setState({
            submitting: false,
          });
        };
        this.setState({
          submitting: true,
        });
        callback(fn);
      },
      render: function render() {
        var _props = this.props,
          wrappedComponentRef = _props.wrappedComponentRef,
          restProps = _objectWithoutProperties(_props, ["wrappedComponentRef"]); // eslint-disable-line

        var formProps = _defineProperty({}, formPropName, this.getForm());
        if (withRef) {
          if (
            process.env.NODE_ENV !== "production" &&
            process.env.NODE_ENV !== "test"
          ) {
            warning(
              false,
              "`withRef` is deprecated, please use `wrappedComponentRef` instead. " +
                "See: https://github.com/react-component/form#note-use-wrappedcomponentref-instead-of-withref-after-rc-form140"
            );
          }
          formProps.ref = "wrappedComponent";
        } else if (wrappedComponentRef) {
          formProps.ref = wrappedComponentRef;
        }
        var props = mapProps.call(this, _extends({}, formProps, restProps));
        return React.createElement(WrappedComponent, props);
      },
    });

    return argumentContainer(unsafeLifecyclesPolyfill(Form), WrappedComponent);
  };
}

export default createBaseForm;
