# Rc-Form源码分析

## Rc-Form文件分析

### createBaseForm.js

* 这个js主要用于创造基本的form 组件

* getInitialState 

  * 创造fieldsStore 

  * 初始化 api

    ```
    "getFieldsValue", // 获取字段值的函数
              "getFieldValue", // 获取字段值的函数
              "setFieldsInitialValue", // 设置字段值的函数
              "getFieldsError", //  获取一组输入控件的 Error ，如不传入参数，则获取全部组件的
              "getFieldError", //	获取某个输入控件的 Error
              "isFieldValidating", //判断一个输入控件是否在校验状态
              "isFieldsValidating", //判断控件是否在校验状态
              "isFieldsTouched", //  判断是否任一输入控件经历过 getFieldDecorator 的值收集时机 options.trigger
              "isFieldTouched", //判断一个输入控件是否经历过 g
    ```

* getFieldProps // 创建待验证的表单 设置字段元数据，返回 计算被修饰组件的属性

  ```
  
  ```

  

