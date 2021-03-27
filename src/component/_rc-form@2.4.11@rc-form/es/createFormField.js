import _extends from "babel-runtime/helpers/extends";
import _classCallCheck from "babel-runtime/helpers/classCallCheck";
// 创建一个字段对象
var Field = function Field(fields) {
  // 检查对象实例是否是当前的构造函数
  _classCallCheck(this, Field);
  //浅拷贝
  _extends(this, fields);
};
 // 检查obj实例是否是Field的构造函数
export function isFormField(obj) {
  return obj instanceof Field;
}
// 创建字段
export default function createFormField(field) {
  if (isFormField(field)) {
    return field;
  }
  return new Field(field);
}