import React, {Component} from 'react';
import './input.css'
/*
* 1.普通登录组件使用的input
* 2.登录时为空的提示语
*
*
*
* */
export default class Inputs extends Component {

    inputs=(event)=>{
        const {onChange} = this.props;
        onChange(event.target.value);
    }
    render() {

        const {placeholder,title,label,children,inputType,style,inputTitle} = this.props;
        return (
            <div className="inputs">
                <div className='label'>{label?label:''}</div>
                <div className='input-box'>
                    <input type={inputType||'text'}  style={style} onInput={this.inputs} className="input-item"  placeholder={placeholder?placeholder:'文本框'}/>
                    <span className='input-title'  style={inputTitle}>{title?title:''}</span>
                </div>
                {children}
            </div>
        )

    }
}