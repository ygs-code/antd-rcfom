import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _extends from 'babel-runtime/helpers/extends';
// 数组去重
import _toConsumableArray from 'babel-runtime/helpers/toConsumableArray';
/* eslint-disable react/prefer-es6-class */
/* eslint-disable prefer-promise-reject-errors */

import React from 'react';
//如果你不使用 ES6 ，你可以使用 create-react-class 方法代替： 用es5 创建一个 react 组件
import createReactClass from 'create-react-class';
import unsafeLifecyclesPolyfill from 'rc-util/es/unsafeLifecyclesPolyfill';
import AsyncValidator from 'async-validator';
import warning from 'warning';
import get from 'lodash/get';
import set from 'lodash/set';
import eq from 'lodash/eq';
// 实例化一个字段存储
import createFieldsStore from './createFieldsStore';
import {
  //在HOC中Component上面绑定的Static方法会丢失
  // 这里有一个解决方法，就是hoist-non-react-statics组件
  // WrappedComponent 子组件
  // 详细说明 https://segmentfault.com/a/1190000008112017?_ea=1553893
  argumentContainer,
  // 拷贝返回一个新的对象
  identity,
  //  正常化验证规则
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
  flattenArray
} from './utils';

var DEFAULT_TRIGGER = 'onChange';
//创建表单
function createBaseForm (option, mixins) {

  //获取 option参数
  option = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  mixins = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  var validateMessages = option.validateMessages, //校验信息
    onFieldsChange = option.onFieldsChange, //当字段更改时调用，可以将字段分派到redux存储区。
    onValuesChange = option.onValuesChange, // 值改变时调用。
    _option$mapProps = option.mapProps, //将新props转移到WrappedComponent。
    mapProps = _option$mapProps === undefined ? identity : _option$mapProps, // 返回一个新的对象
    mapPropsToFields = option.mapPropsToFields, //将值从props转换到字段。用于从redux存储区读取字段。
    fieldNameProp = option.fieldNameProp, //在哪里存储getfieldprops的参数。
    fieldMetaProp = option.fieldMetaProp, //在哪里存储getfieldprops的元数据。
    fieldDataProp = option.fieldDataProp, //在哪里存储字段数据
    _option$formPropName = option.formPropName,
    formPropName = _option$formPropName === undefined ? 'form' : _option$formPropName,
    formName = option.name, // 表单名称
    withRef = option.withRef; //为包装的组件实例userefs维护一个ref。wrappedComponentto访问。

  // 封装高阶组件，为下游WrappedComponent组件注入this.props.form工具函数集等  
  return function decorate (
    WrappedComponent //组件传入进来
  ) {

    // 创建一个组件
    var Form = createReactClass({
      displayName: 'Form',
      // 添加拓展参数
      mixins: mixins,
      // 初始化 state 生命周期
      getInitialState: function getInitialState () {
        var _this = this;

        var fields = mapPropsToFields && mapPropsToFields(this.props); //  存储表单项的值，错误文案等即时数据，重绘表单时props从this.fields取值  
        console.log('fields=', fields)
        debugger
        // 创建字段仓库
        this.fieldsStore = createFieldsStore(fields || {});

        this.instances = {};
        this.cachedBind = {}; // 存储getFieldProps、getFieldDecorator方法经过数据处理后的原始配置值，{name:options}形式  
        this.clearedFieldMetaCache = {};

        this.renderFields = {};
        this.domFields = {};

        // HACK: https://github.com/ant-design/ant-design/issues/6406
        // 为构造方法添加以下方法
        [
          'getFieldsValue',  // 获取字段值的函数
          'getFieldValue',  // 获取字段值的函数
          'setFieldsInitialValue',// 设置字段值的函数
          'getFieldsError', //  获取一组输入控件的 Error ，如不传入参数，则获取全部组件的 
          'getFieldError', //	获取某个输入控件的 Error
          'isFieldValidating', //判断一个输入控件是否在校验状态
          'isFieldsValidating',   //判断控件是否在校验状态
          'isFieldsTouched', //  判断是否任一输入控件经历过 getFieldDecorator 的值收集时机 options.trigger
          'isFieldTouched' //判断一个输入控件是否经历过 getFieldDecorator 的值收集时机 options.trigger
        ].forEach(function (key) {
          _this[key] = function () {
            // 字段存储
            var _fieldsStore;

            if (process.env.NODE_ENV !== 'production') {
              warning(false, 'you should not use `ref` on enhanced form, please use `wrappedComponentRef`. ' + 'See: https://github.com/react-component/form#note-use-wrappedcomponentref-instead-of-withref-after-rc-form140');
            }
            return (_fieldsStore = _this.fieldsStore)[key].apply(_fieldsStore, arguments);
          };
        });

        return {
          submitting: false
        };
      },
      // react 生命周期 完成首次加载组件之后回调
      componentDidMount: function componentDidMount () {
              // 清理无用的字段
        this.cleanUpUselessFields();
      },
      // 表单重绘时，通过mapPropsToFields从props中获取数据注入this.fields  
      componentWillReceiveProps: function componentWillReceiveProps (nextProps) {
        if (mapPropsToFields) {
          // 更新字段
          this.fieldsStore.updateFields(mapPropsToFields(nextProps));
        }
      },
      componentDidUpdate: function componentDidUpdate () {
              // 清理无用的字段
        this.cleanUpUselessFields();
      },
      onCollectCommon: function onCollectCommon (name, action, args) {
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
        var value = fieldMeta.getValueFromEvent ?
         fieldMeta.getValueFromEvent.apply(fieldMeta,
           // 数组去重
          _toConsumableArray(args)) :
          getValueFromEvent.apply(undefined, 
             // 数组去重
            _toConsumableArray(args));
            // 如果值不相同
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
          onValuesChange(
            // 浅拷贝
             _extends(_defineProperty({}, formPropName, this.getForm()), this.props),
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
              fieldMeta: fieldMeta 
          };
      },
      onCollect: function onCollect (name_, action) {
        for (
             var _len = arguments.length,  // 获取参数长度
             args = Array(_len > 2 ? _len - 2 : 0), // 声明 args 变量
            _key = 2;  // 声明key
            _key < _len;
            _key++
            ) {
               // 如果参数大于2的时候 args 减去前面两个参数
          args[_key - 2] = arguments[_key];
        }

        var _onCollectCommon = this.onCollectCommon(name_, action, args),
          name = _onCollectCommon.name, // 字段名称
          field = _onCollectCommon.field, //字段
          fieldMeta = _onCollectCommon.fieldMeta; //字段存储对象

        var validate = fieldMeta.validate; //字段校验规则

        // 检查校验字段 标志dirty 为true 
        this.fieldsStore.setFieldsAsDirty();

        var newField = _extends({}, field, {
            //校验规则
          dirty: hasRules(validate)
        });
        // 设置字段
        this.setFields(_defineProperty({}, name, newField));
      },
      onCollectValidate: function onCollectValidate (name_, action) {
        for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
          args[_key2 - 2] = arguments[_key2];
        }

        var _onCollectCommon2 = this.onCollectCommon(name_, action, args),
          field = _onCollectCommon2.field,
          fieldMeta = _onCollectCommon2.fieldMeta;

        var newField = _extends({}, field, {
          dirty: true
        });
        // 检查校验字段 标志dirty 为true 
        this.fieldsStore.setFieldsAsDirty();

        this.validateFieldsInternal([newField], {
          action: action,
          options: {
            firstFields: !!fieldMeta.validateFirst
          }
        });
      },
      getCacheBind: function getCacheBind (name, action, fn) {
        if (!this.cachedBind[name]) {
          this.cachedBind[name] = {};
        }
        var cache = this.cachedBind[name];
        if (!cache[action] || cache[action].oriFn !== fn) {
          cache[action] = {
            fn: fn.bind(this, name, action),
            oriFn: fn
          };
        }
        return cache[action].fn;
      },
      getFieldDecorator: function getFieldDecorator (name, fieldOption) {
        var _this2 = this;

        var props = this.getFieldProps(name, fieldOption);
        return function (fieldElem) {
          // We should put field in record if it is rendered
          _this2.renderFields[name] = true;

          var fieldMeta = _this2.fieldsStore.getFieldMeta(name);
          var originalProps = fieldElem.props;
          if (process.env.NODE_ENV !== 'production') {
            var valuePropName = fieldMeta.valuePropName;
            warning(!(valuePropName in originalProps), '`getFieldDecorator` will override `' + valuePropName + '`, ' + ('so please don\'t set `' + valuePropName + '` directly ') + 'and use `setFieldsValue` to set it.');
            var defaultValuePropName = 'default' + valuePropName[0].toUpperCase() + valuePropName.slice(1);
            warning(!(defaultValuePropName in originalProps), '`' + defaultValuePropName + '` is invalid ' + ('for `getFieldDecorator` will set `' + valuePropName + '`,') + ' please use `option.initialValue` instead.');
          }
          fieldMeta.originalProps = originalProps;
          fieldMeta.ref = fieldElem.ref;                                        // 获取字段的value 值 
          return React.cloneElement(fieldElem, _extends({}, props, _this2.fieldsStore.getFieldValuePropValue(fieldMeta)));
        };
      },
      getFieldProps: function getFieldProps (name) {
        var _this3 = this;

        var usersFieldOption = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        if (!name) {
          throw new Error('Must call `getFieldProps` with valid name string!');
        }
        if (process.env.NODE_ENV !== 'production') {
          warning(this.fieldsStore.isValidNestedFieldName(name), 'One field name cannot be part of another, e.g. `a` and `a.b`. Check field: ' + name);
          warning(!('exclusive' in usersFieldOption), '`option.exclusive` of `getFieldProps`|`getFieldDecorator` had been remove.');
        }

        delete this.clearedFieldMetaCache[name];

        var fieldOption = _extends({
          name: name,
          trigger: DEFAULT_TRIGGER,
          valuePropName: 'value',
          validate: []
        }, usersFieldOption);

        var rules = fieldOption.rules,
          trigger = fieldOption.trigger,
          _fieldOption$validate = fieldOption.validateTrigger,
          validateTrigger = _fieldOption$validate === undefined ? trigger : _fieldOption$validate,
          validate = fieldOption.validate;


        var fieldMeta = this.fieldsStore.getFieldMeta(name);
        if ('initialValue' in fieldOption) {
          fieldMeta.initialValue = fieldOption.initialValue;
        }
        // 获取字段的value 值 
        var inputProps = _extends({}, this.fieldsStore.getFieldValuePropValue(fieldOption), {
          ref: this.getCacheBind(name, name + '__ref', this.saveRef)
        });
        if (fieldNameProp) {
          inputProps[fieldNameProp] = formName ? formName + '_' + name : name;
        }

        var validateRules = normalizeValidateRules(validate, rules, validateTrigger);
        var validateTriggers = getValidateTriggers(validateRules);
        validateTriggers.forEach(function (action) {
          if (inputProps[action]) return;
          inputProps[action] = _this3.getCacheBind(name, action, _this3.onCollectValidate);
        });

        // make sure that the value will be collect
        if (trigger && validateTriggers.indexOf(trigger) === -1) {
          inputProps[trigger] = this.getCacheBind(name, trigger, this.onCollect);
        }

        var meta = _extends({}, fieldMeta, fieldOption, {
          validate: validateRules
        });
        this.fieldsStore.setFieldMeta(name, meta);
        if (fieldMetaProp) {
          inputProps[fieldMetaProp] = meta;
        }

        if (fieldDataProp) {
          inputProps[fieldDataProp] = this.fieldsStore.getField(name);
        }

        // This field is rendered, record it
        this.renderFields[name] = true;

        return inputProps;
      },
      getFieldInstance: function getFieldInstance (name) {
        return this.instances[name];
      },
      getRules: function getRules (fieldMeta, action) {
        var actionRules = fieldMeta.validate.filter(function (item) {
          return !action || item.trigger.indexOf(action) >= 0;
        }).map(function (item) {
          return item.rules;
        });
        return flattenArray(actionRules);
      },
      // 设置字段
      setFields: function setFields (maybeNestedFields, callback) {
        var _this4 = this;
        // console.log('this.fieldsStore.getNestedAllFields()=',this.fieldsStore.getNestedAllFields())
        //点平注册字段
        var fields = this.fieldsStore.flattenRegisteredFields(maybeNestedFields);
        // 设置字段
        this.fieldsStore.setFields(fields);
        if (onFieldsChange) {
          var changedFields = Object.keys(fields).reduce(function (acc, name) {
            return set(acc, name, _this4.fieldsStore.getField(name));
          }, {});

          onFieldsChange(_extends(_defineProperty({}, formPropName, this.getForm()), this.props), changedFields, this.fieldsStore.getNestedAllFields());
        }
        this.forceUpdate(callback);
      },
      setFieldsValue: function setFieldsValue (changedValues, callback) {
        var fieldsMeta = this.fieldsStore.fieldsMeta;

        var values = this.fieldsStore.flattenRegisteredFields(changedValues);
        var newFields = Object.keys(values).reduce(function (acc, name) {
          var isRegistered = fieldsMeta[name];
          if (process.env.NODE_ENV !== 'production') {
            warning(isRegistered, 'Cannot use `setFieldsValue` until ' + 'you use `getFieldDecorator` or `getFieldProps` to register it.');
          }
          if (isRegistered) {
            var value = values[name];
            acc[name] = {
              value: value
            };
          }
          return acc;
        }, {});
        // 设置字段
        this.setFields(newFields, callback);
        if (onValuesChange) {
          var allValues = this.fieldsStore.getAllValues();
          onValuesChange(_extends(_defineProperty({}, formPropName, this.getForm()), this.props), changedValues, allValues);
        }
      },
      saveRef: function saveRef (name, _, component) {
        if (!component) {
          var _fieldMeta = this.fieldsStore.getFieldMeta(name);
          if (!_fieldMeta.preserve) {
            // after destroy, delete data
            this.clearedFieldMetaCache[name] = {
              field: this.fieldsStore.getField(name),
              meta: _fieldMeta
            };
            this.clearField(name);
          }
          delete this.domFields[name];
          return;
        }
        this.domFields[name] = true;
        this.recoverClearedField(name);
        var fieldMeta = this.fieldsStore.getFieldMeta(name);
        if (fieldMeta) {
          var ref = fieldMeta.ref;
          if (ref) {
            if (typeof ref === 'string') {
              throw new Error('can not set ref string for ' + name);
            } else if (typeof ref === 'function') {
              ref(component);
            } else if (Object.prototype.hasOwnProperty.call(ref, 'current')) {
              ref.current = component;
            }
          }
        }
        this.instances[name] = component;
      },
      // 清理无用的字段
      cleanUpUselessFields: function cleanUpUselessFields () {
        var _this5 = this;
        // 获取全部字段名称
        var fieldList = this.fieldsStore.getAllFieldsName();
        console.log('fieldList=', fieldList)
        var removedList = fieldList.filter(function (field) {
          var fieldMeta = _this5.fieldsStore.getFieldMeta(field);
          // 判断如果不存在renderFields 或者 domFields 或者 fieldMeta.preserve 为假的时候
          return !_this5.renderFields[field] && !_this5.domFields[field] && !fieldMeta.preserve;
        });
        if (removedList.length) {
          // 循环需要清除的字段
          removedList.forEach(this.clearField);
        }
        this.renderFields = {};
      },
      // 清除字段Field
      clearField: function clearField (name) {
        // 清除字段
        this.fieldsStore.clearField(name);
        delete this.instances[name];
        delete this.cachedBind[name];
      },
      resetFields: function resetFields (ns) {
        var _this6 = this;
        // 重置值 但是  initialValue 没能重置 可能是一个bug  // 重置字段的值
        var newFields = this.fieldsStore.resetFields(ns);

        if (Object.keys(newFields).length > 0) {
          // 设置字段
          this.setFields(newFields);
        }
        if (ns) {
          var names = Array.isArray(ns) ? ns : [ns];
          names.forEach(function (name) {
            return delete _this6.clearedFieldMetaCache[name];
          });
        } else {
          this.clearedFieldMetaCache = {};
        }
      },
      recoverClearedField: function recoverClearedField (name) {
        if (this.clearedFieldMetaCache[name]) {
          this.fieldsStore.setFields(_defineProperty({}, name, this.clearedFieldMetaCache[name].field));
          this.fieldsStore.setFieldMeta(name, this.clearedFieldMetaCache[name].meta);
          delete this.clearedFieldMetaCache[name];
        }
      },
      validateFieldsInternal: function validateFieldsInternal (fields, _ref, callback) {
        var _this7 = this;

        var fieldNames = _ref.fieldNames,
          action = _ref.action,
          _ref$options = _ref.options,
          options = _ref$options === undefined ? {} : _ref$options;

        var allRules = {};
        var allValues = {};
        var allFields = {};
        var alreadyErrors = {};
        fields.forEach(function (field) {
          var name = field.name;
          if (options.force !== true && field.dirty === false) {
            if (field.errors) {
              set(alreadyErrors, name, { errors: field.errors });
            }
            return;
          }
          var fieldMeta = _this7.fieldsStore.getFieldMeta(name);
          var newField = _extends({}, field);
          newField.errors = undefined;
          newField.validating = true;
          newField.dirty = true;
          allRules[name] = _this7.getRules(fieldMeta, action);
          allValues[name] = newField.value;
          allFields[name] = newField;
        });
        // 设置字段
        this.setFields(allFields);
        // in case normalize
        Object.keys(allValues).forEach(function (f) {
          allValues[f] = _this7.fieldsStore.getFieldValue(f);
        });
        if (callback && isEmptyObject(allFields)) {
          callback(isEmptyObject(alreadyErrors) ? null : alreadyErrors, this.fieldsStore.getFieldsValue(fieldNames));
          return;
        }
        var validator = new AsyncValidator(allRules);
        if (validateMessages) {
          validator.messages(validateMessages);
        }
        validator.validate(allValues, options, function (errors) {
          var errorsGroup = _extends({}, alreadyErrors);
          if (errors && errors.length) {
            errors.forEach(function (e) {
              var errorFieldName = e.field;
              var fieldName = errorFieldName;

              // Handle using array validation rule.
              // ref: https://github.com/ant-design/ant-design/issues/14275
              Object.keys(allRules).some(function (ruleFieldName) {
                var rules = allRules[ruleFieldName] || [];

                // Exist if match rule
                if (ruleFieldName === errorFieldName) {
                  fieldName = ruleFieldName;
                  return true;
                }

                // Skip if not match array type
                if (rules.every(function (_ref2) {
                  var type = _ref2.type;
                  return type !== 'array';
                }) || errorFieldName.indexOf(ruleFieldName + '.') !== 0) {
                  return false;
                }

                // Exist if match the field name
                var restPath = errorFieldName.slice(ruleFieldName.length + 1);
                if (/^\d+$/.test(restPath)) {
                  fieldName = ruleFieldName;
                  return true;
                }

                return false;
              });

              var field = get(errorsGroup, fieldName);
              if (typeof field !== 'object' || Array.isArray(field)) {
                set(errorsGroup, fieldName, { errors: [] });
              }
              var fieldErrors = get(errorsGroup, fieldName.concat('.errors'));
              fieldErrors.push(e);
            });
          }
          var expired = [];
          var nowAllFields = {};
          Object.keys(allRules).forEach(function (name) {
            var fieldErrors = get(errorsGroup, name);
            var nowField = _this7.fieldsStore.getField(name);
            // avoid concurrency problems
            if (!eq(nowField.value, allValues[name])) {
              expired.push({
                name: name
              });
            } else {
              nowField.errors = fieldErrors && fieldErrors.errors;
              nowField.value = allValues[name];
              nowField.validating = false;
              nowField.dirty = false;
              nowAllFields[name] = nowField;
            }
          });
          _this7.setFields(nowAllFields);
          if (callback) {
            if (expired.length) {
              expired.forEach(function (_ref3) {
                var name = _ref3.name;

                var fieldErrors = [{
                  message: name + ' need to revalidate',
                  field: name
                }];
                set(errorsGroup, name, {
                  expired: true,
                  errors: fieldErrors
                });
              });
            }

            callback(isEmptyObject(errorsGroup) ? null : errorsGroup, _this7.fieldsStore.getFieldsValue(fieldNames));
          }
        });
      },
      validateFields: function validateFields (ns, opt, cb) {
        var _this8 = this;

        var pending = new Promise(function (resolve, reject) {
          var _getParams = getParams(ns, opt, cb),
            names = _getParams.names,
            options = _getParams.options;

          var _getParams2 = getParams(ns, opt, cb),
            callback = _getParams2.callback;

          if (!callback || typeof callback === 'function') {
            var oldCb = callback;
            callback = function callback (errors, values) {
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
          var fieldNames = names ? _this8.fieldsStore.getValidFieldsFullName(names) : _this8.fieldsStore.getValidFieldsName();
          var fields = fieldNames.filter(function (name) {
            var fieldMeta = _this8.fieldsStore.getFieldMeta(name);
              //校验规则
            return hasRules(fieldMeta.validate);
          }).map(function (name) {
            var field = _this8.fieldsStore.getField(name);
            field.value = _this8.fieldsStore.getFieldValue(name);
            return field;
          });
          if (!fields.length) {
            callback(null, _this8.fieldsStore.getFieldsValue(fieldNames));
            return;
          }
          if (!('firstFields' in options)) {
            options.firstFields = fieldNames.filter(function (name) {
              var fieldMeta = _this8.fieldsStore.getFieldMeta(name);
              return !!fieldMeta.validateFirst;
            });
          }
          _this8.validateFieldsInternal(fields, {
            fieldNames: fieldNames,
            options: options
          }, callback);
        });
        pending['catch'](function (e) {
          // eslint-disable-next-line no-console
          if (console.error && process.env.NODE_ENV !== 'production') {
            // eslint-disable-next-line no-console
            console.error(e);
          }
          return e;
        });
        return pending;
      },
      isSubmitting: function isSubmitting () {
        if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
          warning(false, '`isSubmitting` is deprecated. ' + "Actually, it's more convenient to handle submitting status by yourself.");
        }
        return this.state.submitting;
      },
      submit: function submit (callback) {
        var _this9 = this;

        if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
          warning(false, '`submit` is deprecated. ' + "Actually, it's more convenient to handle submitting status by yourself.");
        }
        var fn = function fn () {
          _this9.setState({
            submitting: false
          });
        };
        this.setState({
          submitting: true
        });
        callback(fn);
      },
      render: function render () {
        var _props = this.props,
          wrappedComponentRef = _props.wrappedComponentRef,
          restProps = _objectWithoutProperties(_props, ['wrappedComponentRef']); // eslint-disable-line


        var formProps = _defineProperty({}, formPropName, this.getForm());
        if (withRef) {
          if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
            warning(false, '`withRef` is deprecated, please use `wrappedComponentRef` instead. ' + 'See: https://github.com/react-component/form#note-use-wrappedcomponentref-instead-of-withref-after-rc-form140');
          }
          formProps.ref = 'wrappedComponent';
        } else if (wrappedComponentRef) {
          formProps.ref = wrappedComponentRef;
        }
        var props = mapProps.call(this, _extends({}, formProps, restProps));
        return React.createElement(WrappedComponent, props);
      }
    });

    return argumentContainer(unsafeLifecyclesPolyfill(Form), WrappedComponent);
  };
}

export default createBaseForm;