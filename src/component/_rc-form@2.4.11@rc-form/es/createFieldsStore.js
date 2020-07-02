import _defineProperty from "babel-runtime/helpers/defineProperty";
import _extends from "babel-runtime/helpers/extends";
import _classCallCheck from "babel-runtime/helpers/classCallCheck";
//创建一个reactClass
import _createClass from "babel-runtime/helpers/createClass";
import set from "lodash/set";
import createFormField, { // 创建字段
  isFormField, // 检查obj实例是否是Field的构造函数
} from "./createFormField";
import {
  hasRules, //校验规则
  flattenFields, // 点平化 字段
  getErrorStrs, // 得到错误信息
  startsWith, //判断 prefix 出现位置是索引是不是等于0
} from "./utils";

// b包含a，并且b的开始位置是等于a , 或者 b的位置是a的长度 并且不是 . 或者 [
function partOf(a, b) {
  return b.indexOf(a) === 0 && [".", "["].indexOf(b[a.length]) !== -1;
}
// // 点平化 字段
function internalFlattenFields(fields) {
  // 点平化 字段
  return flattenFields(
    fields,
    function (_, node) {
      //检查obj实例是否是Field的构造函数
      return isFormField(node);
    },
    "You must wrap field data with `createFormField`."
  );
}

// 字段存储
var FieldsStore = (function () {
  // 构造函数
  function FieldsStore(
    fields // 字段
  ) {
    /*
    _classCallCheck 为 检查当前的 this 是否是当前的构造函数
      exports.default = function (instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        };
    
    */
    _classCallCheck(this, FieldsStore);
    // 初始化props
    _initialiseProps.call(this);
    // 点平字段
    this.fields = internalFlattenFields(fields);

    this.fieldsMeta = {}; // 存储表单字段初始化的值
  }
  // 创建一个reactClass
  _createClass(FieldsStore, [
    {
      key: "updateFields", // 更新字段
      value: function updateFields(fields) {
        // 点评字段
        this.fields = internalFlattenFields(fields);
      },
    },
    {
      //点平注册字段
      key: "flattenRegisteredFields",
      value: function flattenRegisteredFields(fields) {
        console.log("flattenRegisteredFields=", fields);
        // 获取所有字段的名称
        var validFieldsName = this.getAllFieldsName();
        // 点平字段
        return flattenFields(
          fields,
          function (path) {
            // 获取循环的字段判断是否存在当前的字段中
            return validFieldsName.indexOf(path) >= 0;
            // 如果获取不到字段则发出警告
          },
          "You cannot set a form field before rendering a field associated with the value."
        );
      },
    },
    {
      // 设置字段
      key: "setFields",
      value: function setFields(fields) {
        var _this = this;
        // 获取字段初始化值
        var fieldsMeta = this.fieldsMeta;
        // 新字段 和 原来字段合并
        var nowFields = _extends({}, this.fields, fields);
        // 新的值
        var nowValues = {};

        Object.keys(fieldsMeta).forEach(function (f) {
          // 获取字段的值
          nowValues[f] = _this.getValueFromFields(
            f, // 字段名称
            nowFields // 所有字段
          );
        });
        // 循环现在的值
        Object.keys(nowValues).forEach(function (f) {
          // 获取单个值
          var value = nowValues[f];
          // 获取单个字段的value值
          var fieldMeta = _this.getFieldMeta(f);
          // 初始化值设定的一个函数 demo https://codepen.io/afc163/pen/JJVXzG?editors=0010
          if (fieldMeta && fieldMeta.normalize) {
            // 获取字段的值
            //当前值
            var nowValue = fieldMeta.normalize(
              value,
              _this.getValueFromFields(f, _this.fields),
              nowValues
            );
            //如果新的值和旧的值不相同则更新新的值
            if (nowValue !== value) {
              nowFields[f] = _extends({}, nowFields[f], {
                value: nowValue,
              });
            }
          }
        });
        // 设置 字段
        this.fields = nowFields;
      },
    },
    {
      // 重置值 但是  initialValue 没能重置 可能是一个bug
      key: "resetFields",
      // 重置字段的值
      value: function resetFields(ns) {
        var fields = this.fields;
        // 从所有字段中 过滤出 maybePartialName 参数匹配到的字段    //获取全部字段名称
        var names = ns
          ? this.getValidFieldsFullName(ns)
          : this.getAllFieldsName();
        // 重置 value 清空
        return names.reduce(function (acc, name) {
          var field = fields[name];
          if (field && "value" in field) {
            acc[name] = {};
          }
          return acc;
        }, {});
      },
    },
    {
      // 设置记录fields初始化值
      key: "setFieldMeta",
      value: function setFieldMeta(name, meta) {
        this.fieldsMeta[name] = meta;
      },
    },
    {
      key: "setFieldsAsDirty",
      // 检查校验字段 标志dirty 为true
      value: function setFieldsAsDirty() {
        var _this2 = this;
        // 循环字段
        Object.keys(this.fields).forEach(function (name) {
          //获取单个字段
          var field = _this2.fields[name];
          var fieldMeta = _this2.fieldsMeta[name];
          //校验规则 判断有校验规则
          if (field && fieldMeta && hasRules(fieldMeta.validate)) {
            // 如果 有校验 标志dirty 为真 表示脏的 需要校验
            _this2.fields[name] = _extends({}, field, {
              dirty: true,
            });
          }
        });
      },
    },
    {
      // 获取单个字段的getFieldMeta值 也可以理解是初始化值
      key: "getFieldMeta",
      value: function getFieldMeta(name) {
        this.fieldsMeta[name] = this.fieldsMeta[name] || {};
        return this.fieldsMeta[name];
      },
    },
    {
      // 获取字段的值
      key: "getValueFromFields",
      value: function getValueFromFields(
        name, // 字段名称
        fields // 所有的字段
      ) {
        var field = fields[name]; // 获取当前的字段
        if (field && "value" in field) {
          return field.value; //如果有值的返回出去
        }
        // 获取单个字段的value值
        var fieldMeta = this.getFieldMeta(name);
        // 如果字段用没有值则取初始化值
        return fieldMeta && fieldMeta.initialValue;
      },
    },
    {
      // 获取所有字段的名称，不包含 含有hidden 属性的字段
      key: "getValidFieldsName",
      value: function getValidFieldsName() {
        var _this3 = this;
        //记录fields初始化值
        var fieldsMeta = this.fieldsMeta;

        return fieldsMeta
          ? Object.keys(fieldsMeta).filter(function (name) {
              // 获取单个字段的getFieldMeta值
              return !_this3.getFieldMeta(name).hidden;
            })
          : [];
      },
    },
    {
      //获取全部字段名称
      key: "getAllFieldsName",
      value: function getAllFieldsName() {
        var fieldsMeta = this.fieldsMeta;
        return fieldsMeta ? Object.keys(fieldsMeta) : [];
      },
    },
    {
      key: "getValidFieldsFullName",
      // 从所有字段中 过滤出 maybePartialName 参数匹配到的字段
      value: function getValidFieldsFullName(maybePartialName) {
        // 判断maybePartialName是否是数组 如果不是数组则包装成一个数组
        var maybePartialNames = Array.isArray(maybePartialName)
          ? maybePartialName
          : [maybePartialName];
        // 获取所有字段的名称，不包含 含有hidden 属性的字段
        return this.getValidFieldsName().filter(function (fullName) {
          //只要有一项满足条件，就会返回true。
          return maybePartialNames.some(function (partialName) {
            // 判断 prefix 出现位置是索引是不是等于0
            // 如果找到啦就返回真
            return (
              fullName === partialName ||
              (startsWith(fullName, partialName) &&
                [".", "["].indexOf(fullName[partialName.length]) >= 0)
            );
          });
        });
      },
    },
    {
      // 获取字段的value 值
      key: "getFieldValuePropValue",
      value: function getFieldValuePropValue(fieldMeta) {
        //获取字段名称
        var name = fieldMeta.name,
          //获取ValueProps
          getValueProps = fieldMeta.getValueProps,
          valuePropName = fieldMeta.valuePropName;
        // 获取单个字段对象
        var field = this.getField(name);
        // 字段是否存在值，如果没有则给初始化值
        var fieldValue =
          "value" in field ? field.value : fieldMeta.initialValue;
        // 如果属性上面设置有值则返回值
        if (getValueProps) {
          return getValueProps(fieldValue);
        }
        // 添加描述属性
        return _defineProperty({}, valuePropName, fieldValue);
      },
    },
    {
      // 获取单个字段对象
      key: "getField",
      value: function getField(name) {
        return _extends({}, this.fields[name], {
          name: name,
        });
      },
    },
    {
      // 获取未收集的字段  // 为字段重新转义成对象
      key: "getNotCollectedFields",
      value: function getNotCollectedFields() {
        var _this4 = this;
        // 获取所有字段的名称，不包含 含有hidden 属性的字段
        var fieldsName = this.getValidFieldsName();
        // 为字段重新转义成对象，过滤字段名称不存在的
        return fieldsName
          .filter(function (name) {
            return !_this4.fields[name];
          })
          .map(function (name) {
            return {
              name: name,
              dirty: false,
              // 获取单个字段的value初始化值
              value: _this4.getFieldMeta(name).initialValue,
            };
          })
          .reduce(
            function (acc, field) {
              // 创建字段
              return set(acc, field.name, createFormField(field));
            },
            {} // 初始值
          );
      },
    },
    {
      // 嵌套所有字段
      key: "getNestedAllFields",
      value: function getNestedAllFields() {
        var _this5 = this;
        // 循环所有字段
        return Object.keys(this.fields).reduce(
          function (acc, name) {
            // 创建字段
            return set(acc, name, createFormField(_this5.fields[name]));
          },
          // 获取未收集的字段  // 为字段重新转义成对象
          this.getNotCollectedFields() // 初始值
        );
      },
    },
    {
      // 获取单个字段对象的值 按member key 获取
      key: "getFieldMember",
      value: function getFieldMember(name, member) {
        // 获取单个字段对象的值
        return this.getField(name)[member];
      },
    },
    {
      // 重新定义设置 fields 每个field对象的值，可以根据getter函数值，  可以返回自定义的值
      key: "getNestedFields",
      value: function getNestedFields(
        names, //字段名称
        getter //自定义设置字段对象的函数
      ) {
        // 获取所有字段的名称，不包含 含有hidden 属性的字段
        var fields = names || this.getValidFieldsName();

        return fields.reduce(
          function (acc, f) {
            // field设置对象值
            return set(acc, f, getter(f));
          },
          {} //初始化值
        );
      },
    },
    {
      key: "getNestedField",
      // 根据getter 函数功能返回一个数组或者一个对象集合
      value: function getNestedField(name, getter) {
        // 从所有字段中 过滤出 maybePartialName 参数匹配到的字段
        var fullNames = this.getValidFieldsFullName(name);
        if (
          fullNames.length === 0 || // Not registered 没有查询到对应字段
          (fullNames.length === 1 && fullNames[0] === name) // Name already is full name. 名字已经是全名了。 只有一个字段的情况
        ) {
          return getter(name);
        }
        // 匹配[name] 这样的字符串 判断他是否是数组
        var isArrayValue = fullNames[0][name.length] === "[";
        // 判断name
        var suffixNameStartIndex = isArrayValue ? name.length : name.length + 1;
        // 返回一个数组或者对象
        return fullNames.reduce(
          function (acc, fullName) {
            return set(
              acc,
              fullName.slice(suffixNameStartIndex),
              getter(fullName)
            );
          },
          isArrayValue ? [] : {}
        );
      },
    },
    {
      key: "isValidNestedFieldName",
      // @private
      // BG: `a` and `a.b` cannot be use in the same form
      // 嵌套是否是可用的字段名
      value: function isValidNestedFieldName(name) {
        // 获取全部的字段name
        var names = this.getAllFieldsName();
        //每一个元素经传入的函数处理都返回true该方法才返回true
        return names.every(function (n) {
          // b包含a，并且b的开始位置是等于a , 或者 b的位置是a的长度 并且不是 . 或者 [
          return !partOf(n, name) && !partOf(name, n);
        });
      },
    },
    {
      key: "clearField",
      // 清除字段
      value: function clearField(name) {
        delete this.fields[name];
        delete this.fieldsMeta[name];
      },
    },
  ]);
  // 返回字段仓库
  return FieldsStore;
})();

var _initialiseProps = function _initialiseProps() {
  var _this6 = this;
  // 设置初始化值的函数
  this.setFieldsInitialValue = function (initialValues) {
    //点平注册字段
    var flattenedInitialValues = _this6.flattenRegisteredFields(initialValues);
    var fieldsMeta = _this6.fieldsMeta;
    // 循环所有字段
    Object.keys(flattenedInitialValues).forEach(function (name) {
      // 获取 单个字段名
      if (fieldsMeta[name]) {
        // 如果字段存在            // 获取单个字段的value值
        _this6.setFieldMeta(
          name,
          _extends({}, _this6.getFieldMeta(name), {
            initialValue: flattenedInitialValues[name],
          })
        );
      }
    });
  };
  // 获取全部字段值的函数
  this.getAllValues = function () {
    var fieldsMeta = _this6.fieldsMeta,
      fields = _this6.fields;

    return Object.keys(fieldsMeta).reduce(function (acc, name) {
      // 获取字段的值
      return set(acc, name, _this6.getValueFromFields(name, fields));
    }, {});
  };
  // 获取字段值得函数
  this.getFieldsValue = function (names) {
    // 重新定义设置 fields 每个field对象的值，可以根据getter函数值，  可以返回自定义的值
    return _this6.getNestedFields(names, _this6.getFieldValue);
  };
  // 获取单个值得函数
  this.getFieldValue = function (name) {
    var fields = _this6.fields;
    // 根据getter 函数功能返回一个数组或者一个对象集合
    return _this6.getNestedField(name, function (fullName) {
      // 获取字段的值
      return _this6.getValueFromFields(fullName, fields);
    });
  };
  //获取一组输入控件的 Error ，如不传入参数，则获取全部组件的 Error
  this.getFieldsError = function (names) {
    // 重新定义设置 fields 每个field对象的值，可以根据getter函数值，  可以返回自定义的值
    return _this6.getNestedFields(names, _this6.getFieldError);
  };
  //获取某个输入控件的 Error
  this.getFieldError = function (name) {
    // 根据getter 函数功能返回一个数组或者一个对象集合
    return _this6.getNestedField(name, function (fullName) {
      // 获取单个字段对象的值 按member key 获取
      return getErrorStrs(_this6.getFieldMember(fullName, "errors"));
    });
  };
  //判断一个输入控件是否在校验状态
  this.isFieldValidating = function (name) {
    // 获取单个字段对象的值 按member key 获取
    return _this6.getFieldMember(name, "validating");
  };
  // 判断字段是否在校验中
  this.isFieldsValidating = function (ns) {
    // 获取所有字段的名称，不包含 含有hidden 属性的字段
    var names = ns || _this6.getValidFieldsName();
    return names.some(function (n) {
      return _this6.isFieldValidating(n);
    });
  };
  //判断一个输入控件是否经历过 getFieldDecorator 的值收集时机 options.trigger
  this.isFieldTouched = function (name) {
    // 获取单个字段对象的值 按member key 获取
    return _this6.getFieldMember(name, "touched");
  };
  //判断是否任一输入控件经历过 getFieldDecorator 的值收集时机 options.trigger
  this.isFieldsTouched = function (ns) {
    // 获取所有字段的名称，不包含 含有hidden 属性的字段
    var names = ns || _this6.getValidFieldsName();
    return names.some(function (n) {
      return _this6.isFieldTouched(n);
    });
  };
};
// 实例化一个字段存储
export default function createFieldsStore(fields) {
  // 实例化一个字段存储
  return new FieldsStore(fields);
}
