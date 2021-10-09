import React,{Component} from 'react';
import {Modal} from 'antd';

export default class ModelLi extends Component{



    render(){
        const {modelData,children} = this.props;
        console.log(modelData);
        return(
        <Modal title={'文章封面上传'}  visible={modelData.visible} closable={modelData.closable}>
            {children}
        </Modal>
        )
    }
}