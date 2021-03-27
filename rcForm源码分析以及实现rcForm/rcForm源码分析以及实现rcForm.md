#  Rc-Form源码分析

## 1.简单概述Rc-Form和antd esign form关系

* rc组件是基于react的一些列表单组件。
* antd esign 组件 是基于rc组件+ui再去封装的组件
* 所以Rc-Form的功能 antd esign form 功能 是一致的。只是ui上有所不同



## 2.看组件，框架源码思路

* 首先需要会组件或者框架基本的使用，以及熟悉api。
* 需要一定时间和耐心。

## 3.开始Rc-Form源码分析 源码分析

### 下载源码到本地目录

* 用npm i rc-form --save-dev 下载到项目中
* 最好把 node_modules 的rc-form 包考到自己项目中，这样后期看的时候自己加注释不会被删除掉。
* 当然也可以看cdn 文件。

### Rc-Form文件作用以及整个Rc-Form代码构思

* Rc-Form npm 包有几个目录， dits（webpack打包后生产包），es（es6包），lib（es5包）。
* 如果不在webpack 修改libraryDirectory 选项 一般webpack 默认用的是es包。

#### es包文件介绍

##### index.js 

* 导出createForm ， formShape，createForm等方法

##### createBaseForm.js

* 创建基本的form对象

  * 为组件props添加方法

    ```
          getFieldsValue
          getFieldValue
          getFieldInstance
          setFieldsValue 
          setFields 
          setFieldsInitialValue  
          getFieldDecorator 
          getFieldProps 
          getFieldsError 
          getFieldError 
          isFieldValidating 
          isFieldsValidating 
          isFieldsTouched 
          isFieldTouched 
          isSubmitting 
          submit 
          validateFields 
          resetFields 
    ```

  * 调用  createFieldsStore方法 实例化FieldsStore类，创建FieldsStore仓库。

     ```
      // 创建字段仓库. 
       this.fieldsStore = createFieldsStore(fields || {});
     ```

    

  * 为组件添加验证 onchange事件

    ```
      
       validateTriggers.forEach(function (action) {
       ...
      //获取缓存绑定 change 事件
              inputProps[action] = _this3.getCacheBind(
                name,
                action,
                // 收集 事件中获取值 和从事件中设置值
                _this3.onCollectValidate
              );
            });
            
            
            ...
               });
            
            
    ```

##### createFieldsStore.js

* FieldsStore 类 包括 字段的增，删，改，查，方法

* this.fieldsMeta  初始化字段存放存放对象数据 

* this.fields  change事件动态改变更新value字段存放对象数据 

  ```
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
          // 获取单个字段的getFieldMeta 对象 这个是字段 信息
          var fieldMeta = this.getFieldMeta(name);
          // 如果字段用没有值则取初始化值
          return fieldMeta && fieldMeta.initialValue;
        },
      },
  ```

* setFields 方法  设置字段 新的值

  *  



  





