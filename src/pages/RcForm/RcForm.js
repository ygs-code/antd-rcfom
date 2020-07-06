import React, { Component } from "react";
// import Button from 'antd/es/button';
// import { Icon, Button } from 'antd';
import "./RcForm.less";
import { Icon, Input, Button, Checkbox, Form } from "antd";

import { createForm, formShape } from "@/component/_rc-form@2.4.11@rc-form";

class RcForm extends React.Component {
  // static propTypes = {
  //   form: formShape,
  // };

  submit = (e) => {
    // this.props.form.resetFields(["note"]);
    console.log("this.props.form=", this.props.form);

    this.props.form.setFields({
      "note.tree": {
        value: 123,
        // errors: [new Error("forbid ha")],
      },
    });

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
          {/* <Input></Input> */}
          <Form.Item label="Note">
            {getFieldDecorator("note.tree", {
              // rules: [{ required: true, message: "Please input your note!" }],
            })(<Input />)}
            {(errors = getFieldError("note.tree")) ? errors.join(",") : null}
          </Form.Item>
          <Form.Item label="age">
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
            {(errors = getFieldError("age")) ? errors.join(",") : null}
          </Form.Item>

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

          <Input
            {...getFieldProps("required", {
              // initialValue:123,
              onChange(value) {
                console.log("value==", value);
              }, // have to write original onChange here if you need
              rules: [
                {
                  required: true,
                  message: "必填项目",
                },
              ],
            })}
          />
          {(errors = getFieldError("required")) ? errors.join(",") : null}
          <button onClick={this.submit}>submit</button>
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
