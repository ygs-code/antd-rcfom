/*
 * @Author: your name
 * @Date: 2020-06-24 14:11:24
 * @LastEditTime: 2021-04-23 11:42:39
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /antd-rcfom/src/pages/Form/Form.js
 */
import React, { Component } from 'react';
// import Button from 'antd/es/button';
// import { Icon, Button } from 'antd';
import './Form.less';
import { Form, Icon, Input, Button, Checkbox } from 'antd';

console.log('process.env.NODE_ENV=',process.env.NODE_ENV)
console.log('process.argv=',process.argv)

class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const { getFieldDecorator,getFieldProps } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
         <input ref="ref_normal" {...getFieldProps("normal")} />
          {/* {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />,
          )}

            {getFieldDecorator('age', {
            rules: [{ required: true, message: 'Please input your age!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />,
          )} */}
          <div name="username">asdfsdaf</div>
          <div>asdfsdaf</div>
          <div>asdfsdaf</div>
          <div>asdfsdaf</div>
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)}
          <a className="login-form-forgot" href="">
            Forgot password
          </a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <a href="">register now!</a>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);
export default WrappedNormalLoginForm;