import React, { Component } from 'react';
// import Button from 'antd/es/button';
import { Icon, Button } from 'antd';
import './Antd.less';
class Antd extends Component {
    handleClick() {
        window.less.modifyVars(//更换主题颜色要这么写
            {
                '@primary-color': '#e64e14',
                '@btn-primary-bg': '#5d72cc',
                '@title-color': '#ccc'
            }
        )
            .then(() => { console.log('success') })
            .catch(error => {
                console.log(error);
            });
    }
    render() {
        return (
            <div className="App">
                <h3 className="title-color">1234</h3>
                <Button onClick={this.handleClick} type="primary">Button</Button>
                <Icon type="double-right" />
            </div>
        );
    }
}

export default Antd;