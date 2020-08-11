import React, { Component } from "react";
// import Button from 'antd/es/button';
// import { Icon, Button } from 'antd';
import "./RcForm.less";
import { Icon, Input, Button, Checkbox, Form } from "antd";

import { createForm, formShape } from "@/component/_rc-form@2.4.11@rc-form";

class Item extends React.Component {
  constructor(props){
    super(props);
    this.children ={}
  }
  componentDidMount() {
    this.children  =  this.getFieldDecoratorChild(this.props.children)
  }
  getFieldDecoratorChild(component){
    if (React.isValidElement(component)) {
      const {
        props: {
          onChange: {
            __reactBoundArguments,
            __reactBoundContext: { getFieldError } = {},
          } = [],
        } = [],
      } = component;
      if (__reactBoundArguments && __reactBoundArguments.length >= 1) {
        return  {
          ...component,
          name: __reactBoundArguments[0],
          getFieldError,
        };
       
      }else if(component.props.children){
        
        return  this.getFieldDecoratorChild(component.props.children)
      }
    } else {
      for (let item of component) {
        if (React.isValidElement(item)) {
          const {
            props: {
              onChange: {
                __reactBoundArguments,
                __reactBoundContext: { getFieldError } = {},
              } = [],
            } = [],
          } = item;
          if (__reactBoundArguments && __reactBoundArguments.length >= 1) {
            return {
              ...item,
              name: __reactBoundArguments[0],
              getFieldError,
            };
            // break;
          }if(component.props.children){
            return this.getFieldDecoratorChild(component.props.children)
          }
        }
      }
    }
  }
  render() {
    // const {
    //   children:{
    //     _self:{
    //       props:{
    //         form:{
    //           getFieldError=(error=[])=>error,
    //           getFieldValue,
    //         }={}
    //       }={}
    //     }={}
    //   }={}
    // }= this.props
    const {
      // _self:{
      //   props:{
      //     form={

      //     }
      //   }={}
      // }={},
      getFieldError = () => {},
      name = "",
    } = this.children || {};
    const { label } = this.props;
    const errorInfo = getFieldError(name)
      ? getFieldError(name).join(",")
      : null;

    return (
      <div class="ant-row ant-form-item  custom-form-item">
        {label !== undefined ? (
          <div class="ant-col ant-col-5 ant-form-item-label">
            <label class="" title={label}>
              {label}
            </label>
          </div>
        ) : null}
        <div class="ant-col ant-col-12 ant-form-item-control-wrapper">
          <div
            class="ant-form-item-control  "
            className={errorInfo ? "has-error" : ""}
          >
            <span class="ant-form-item-children">
              {React.Children.map(this.props.children, (child) => {
                return React.cloneElement(child, child.props);
              })}
            </span>
            {errorInfo ? <div class="ant-form-explain">{errorInfo}</div> : null}
          </div>
        </div>
      </div>
    );
  }
}

class RcForm extends React.Component {
  // static propTypes = {
  //   form: formShape,
  // };

  submit = (e) => {
    // this.props.form.setFields({
    //   "note.tree": {
    //     value: 123,
    //     // errors: [new Error("forbid ha")],
    //   },
    // });
    this.props.form.resetFields(["age"]);
    console.log("this.props.form=", this.props.form);

    // setTimeout(() => {
    this.props.form.validateFields((error, value) => {
      console.log(error, value);
      debugger;
    });
    e.preventDefault();
    e.stopPropagation();
    e.cancelBubble = true;
    return false;
    // }, 100);
  };
  componentDidMount() {
    this.props.form.setFieldsValue({
      age: "29",
      name: "姚观寿",
    });
  }
  render() {
    let errors;
    const { getFieldProps, getFieldError, getFieldDecorator } = this.props.form;
    return (
      <div>
        <Form
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 12 }}
          onSubmit={this.submit}
        >
          {/* {
          console.log({...getFieldProps('123')})
        } */}
          <input ref="ref_normal" {...getFieldProps("normal")} />
          {/* <Item>
            <div name="yao guan shou ">123</div>
          </Item> */}
          {/* <Input></Input> */}
          {/* <Item label="Note">
            {getFieldDecorator("note.tree", {
              rules: [{ required: true, message: "Please input your note!" }],
            })(<Input />)}
            
            <div>这个是组件</div>
            <Item label="add">
              {getFieldDecorator("add", {
                rules: [{ required: true, message: "Please input your add!" }],
              })(<Input />)}
            </Item>
          </Item> */}
          <Item label="age">
            <div>
            {getFieldDecorator("age", {
              rules: [
                { required: true, message: "Please input your note!" },
                {
                  validator: (rule, value, callback) => {
                    const { getFieldValue } = this.props.form;
                    // if (value && value !== getFieldValue("newPassword")) {
                    callback("年龄不正确");
                    // }

                    // Note: 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
                    // callback();
                  },
                },
              ],
            })(<Input />)}
            {/* {(errors = getFieldError("age")) ? errors.join(",") : null} */}
            </div>
          </Item>
          <Form.Item label="name">
            {getFieldDecorator("name", {
              rules: [
                { required: true, message: "Please input your note!" },
                {
                  validator: (rule, value, callback) => {
                    const { getFieldValue } = this.props.form;
                    // if (value && value !== getFieldValue("newPassword")) {
                    callback("名称错误");
                    // }

                    // Note: 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
                    // callback();
                  },
                },
              ],
            })(<Input />)}
            {(errors = getFieldError("name")) ? errors.join(",") : null}
          </Form.Item>
          <Form.Item label="address">
            {getFieldDecorator("address", {
              rules: [
                { required: true, message: "Please input your note!" },
                {
                  validator: (rule, value, callback) => {
                    const { getFieldValue } = this.props.form;
                    // if (value && value !== getFieldValue("newPassword")) {
                    // callback("地址错误");
                    return new Promise((resolve, reject) => {
                      // if (value < 18) {
                      reject("地址错误"); // reject with error message
                      // } else {
                      //   resolve();
                      // }
                    });
                    // }

                    // Note: 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
                    // callback();
                  },
                },
              ],
            })(<Input />)}
            {(errors = getFieldError("address")) ? errors.join(",") : null}
          </Form.Item>
          <Form.Item label="type">
            {getFieldDecorator("type", {
              rules: [
                { required: true, message: "Please input your note!" },
                {
                  asyncValidator: (rule, value, callback) => {
                    const { getFieldValue } = this.props.form;
                    // if (value && value !== getFieldValue("newPassword")) {
                    // callback("地址错误");
                    return new Promise((resolve, reject) => {
                      // if (value < 18) {
                      reject("类型错误"); // reject with error message
                      // } else {
                      //   resolve();
                      // }
                    });
                    // }

                    // Note: 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
                    // callback();
                  },
                },
              ],
            })(<Input />)}
            {(errors = getFieldError("type")) ? errors.join(",") : null}
          </Form.Item>
          <Form.Item label="info">
            {getFieldDecorator("info", {
              rules: [
                { required: true, message: "Please input your note!" },
                {
                  asyncValidator: (rule, value, callback) => {
                    const { getFieldValue } = this.props.form;
                    // if (value && value !== getFieldValue("newPassword")) {
                    // callback("地址错误");

                    // if (value < 18) {
                    callback("信息错误"); // reject with error message
                    // } else {
                    //   resolve();
                    // }

                    // }

                    // Note: 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
                    // callback();
                  },
                },
              ],
            })(<Input />)}
            {(errors = getFieldError("info")) ? errors.join(",") : null}
          </Form.Item>
          <Form.Item label="sex">
            {getFieldDecorator("sex", {
              rules: [
                { required: true, message: "Please input your note!" },
                {
                  asyncValidator: (rule, value, callback) => {
                    const { getFieldValue } = this.props.form;
                    // if (value && value !== getFieldValue("newPassword")) {
                    // callback("地址错误");

                    // if (value < 18) {
                    callback("信息错误"); // reject with error message
                    // } else {
                    //   resolve();
                    // }

                    // }

                    // Note: 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
                    // callback();
                  },
                },
              ],
            })(<input type="checkbox" id="check1" />)}
            {(errors = getFieldError("sex")) ? errors.join(",") : null}
          </Form.Item>
          =<button onClick={this.submit}>submit</button>
          <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default createForm()(RcForm);
