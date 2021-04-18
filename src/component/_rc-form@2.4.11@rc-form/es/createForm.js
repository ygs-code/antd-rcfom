import createBaseForm from "./createBaseForm";

export var mixin = {
  getForm: function getForm() {
    return {
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
      validateFields: this.validateFields, //验证字段,返回promise
      resetFields: this.resetFields, // 重置字段
    };
  },
};
// 创建表单
function createForm(options) {
  //创建表单
  return createBaseForm(options, [mixin]);
}

export default createForm;


// createForm({
//   name:'FormName',
// onValuesChange(){
// }
// })(component)