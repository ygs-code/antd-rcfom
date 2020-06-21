import React, { Component } from 'react';
// import Button from 'antd/es/button';
// import { Icon, Button } from 'antd';
import './RcForm.less';
import {   Icon, Input, Button, Checkbox } from 'antd';

import { createForm, formShape } from '@/component/_rc-form@2.4.11@rc-form';

class Form extends React.Component {
  // static propTypes = {
  //   form: formShape,
  // };

  submit = () => {
    this.props.form.resetFields(['required'])
    console.log('this.props.form=',this.props.form)

    this.props.form.setFields({
      required: {
        value: 123,
        errors: [new Error('forbid ha')],
      },
    });

    setTimeout(()=>{
      this.props.form.validateFields((error, value) => {
        console.log(error, value);
        debugger
      });

    },100)
 
  }
  componentDidMount(){
    this.props.form.setFieldsValue({
      normal:'123',
      required:'456'
    })
  }
  render() {
    let errors;
    const { getFieldProps, getFieldError } = this.props.form;
    return (
      <div>
        {/* {
          console.log({...getFieldProps('123')})
        } */}
        <input   {...getFieldProps('normal')}/>
        <Input 
         {...getFieldProps('required', 
         {
          // initialValue:123, 
          onChange(value){
            console.log('value==',value)
          }, // have to write original onChange here if you need
          rules: [
             {
            required: true,
            message:'必填项目'
            }
          ],
        })}/>
        {(errors = getFieldError('required')) ? errors.join(',') : null}
        <button onClick={this.submit}>submit</button>
      </div>
    );
  }
}

export default createForm()(Form);