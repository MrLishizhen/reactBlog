import React, {Component} from 'react';
import Inputs from '../../components/inputs'
import './index.css'
import $cookie from 'js-cookie';
import {captcha, login} from '../../api/login'
import {message} from 'antd';
import {getUser} from "../../api/home";

export default class User extends Component {

    state = {
        name: '',//账号
        pwd: '',//密码
        code: '',//验证码
        codeSvg: '',//验证码
        userName: {
            placeholder: '请输入名字',
            title: '名字为必填',
            label: '姓名',
            type: 'name',
            style: {},
            inputTitle: {}
        },
        pawName: {
            placeholder: '请输入密码',
            title: '密码为必填',
            label: '密码',
            inputType: 'password',
            type: 'pwd',
            style: {},
            inputTitle: {}
        },
        VerificationCode: {
            placeholder: '请输入验证码',
            title: '验证码为必填',
            label: '验证码',
            inputType: 'text',
            type: 'code',
            style: {},
            inputTitle: {}
        }

    }

    componentDidMount() {
        window.addEventListener('keyup',this.keyUp,false);
        this.codeClick();
    }
    //卸载时
    componentWillUnmount(){
        window.removeEventListener('keyup',this.keyUp,false);
    }
    //处理必填项为空时
    uninitInputStyle = () => {
        const {name, pwd, code} = this.state;

        //处理样式问题

        if (!name) {
            this.setState({
                userName: {
                    ...this.state.userName,
                    style: {borderColor: 'red'},
                    inputTitle: {display: 'block'},
                }
            })
        } else if (!pwd) {
            this.setState({
                pawName: {
                    ...this.state.pawName,
                    style: {borderColor: 'red'},
                    inputTitle: {display: 'block'},
                }
            })
        } else if (!code) {
            this.setState({
                VerificationCode: {
                    ...this.state.VerificationCode,
                    style: {borderColor: 'red'},
                    inputTitle: {display: 'block'},
                }
            })
        } else {
            return true;
        }
        return false;
    }

    keyUp=(e)=>{

        const {name, pwd, code} = this.state;
        if(e.keyCode===13&&name!==''&&pwd!==''&&code.length===4){
            this.sumClick();
        }else{
            //没有输入完数据回车无效
            // console.log(123)
        }
    }

    //处理必填项的样式问题
    initInputStyle = () => {
        const {name, pwd, code} = this.state;

        //处理样式问题
        if (!name) {
            this.setState({
                userName: {
                    ...this.state.userName,
                    style: {borderColor: '#e0e0e0'},
                    inputTitle: {display: 'none'},
                }
            })
        } else if (!pwd) {
            this.setState({
                pawName: {
                    ...this.state.pawName,
                    style: {borderColor: '#e0e0e0'},
                    inputTitle: {display: 'none'},
                }
            })
        } else if (!code) {
            this.setState({
                VerificationCode: {
                    ...this.state.VerificationCode,
                    style: {borderColor: '#e0e0e0'},
                    inputTitle: {display: 'none'},
                }
            })
        }
    }

    handleInputChangeFn = (val) => {

        this.setState(val);

        this.initInputStyle();
    }
    //重新加载验证码
    codeClick = () => {
        captcha().then(res => {
            if (res.status === 200) {
                // console.log(res.data);
                this.setState({codeSvg: res.data});
                // this.codeSvg.innerHTML = res.data;
            }
        })
    }

    submitFun = () => {
        const {name, pwd, code} = this.state;
        login({name, pwd, captcha: code}).then(res => {

            if (res?.status === 199) {
                message.error('验证码错误');
            } else if (res?.status === 200) {
                //表示登陆成功
                message.success('登录成功，正在跳转首页。');
                //保存token
                $cookie.set('userToken', res.data);

                getUser().then(res => {
                    if (res.status === 200) {
                        sessionStorage.setItem('user', JSON.stringify(res.data));
                        this.props.history.replace(`/home/share`);
                    } else {
                        this.props.history.replace('/servere/login');
                    }
                });

                // console.log(res.data);
                //跳转home页

                //如果成功了就不在请求验证码了，否则就重新请求
                return;
            }
            //重新请求验证码
            this.codeClick();
        });
    }


    //点击事件
    sumClick = () => {
        let initState = this.uninitInputStyle();
        if (initState) {
            this.submitFun()
        }

    }


    render() {
        return (
            <div className='login-box'>

                <div className='bg-1'></div>
                <div className="bg-2"></div>

                {/*<div className="loading">*/}

                {/*    <svg version="1.2" height="84" width="1301" viewport="0 0 1301 1301">*/}
                {/*        <defs>*/}
                {/*            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">*/}
                {/*                <stop offset="0%" style={{'stopColor':'#fff','stopOpacity':1}}/>*/}
                {/*                <stop offset="40%" style={{"stopColor":"#fff","stopOpacity":"0.5"}}/>*/}
                {/*                <stop offset="100%" style={{"stopColor":"#fff","stopOpacity":"0"}}/>*/}
                {/*            </linearGradient>*/}
                {/*        </defs>*/}
                {/*        <defs>*/}
                {/*            <linearGradient x1="0%" y1="0%" x2="100%" y2="0%" id="grad2">*/}
                {/*                <stop offset="0%" style={{"stopColor":"#fff","stopOpacity":"0"}}/>*/}
                {/*                <stop offset="40%" style={{"stopColor":"#fff","stopOpacity":"0.5"}}/>*/}
                {/*                <stop offset="100%" style={{'stopColor':'#fff','stopOpacity':1}}/>*/}
                {/*            </linearGradient>*/}
                {/*        </defs>*/}


                {/*        <path id="pulsarRight" stroke="url(#grad1)" fill="none" strokeWidth="2" strokeLinejoin="round"*/}
                {/*              d="M655,66 L655,66 L591,66 L576,81 L322,81 L301,62 L66,62 L5,0"/>*/}
                {/*        <path id="pulsarLeft" stroke="url(#grad2)" fill="none" strokeWidth="2" strokeLinejoin="round"*/}
                {/*              d="M655,66 L655,66 L711,66 L726,81 L980,81 L1002,62 L1237,62 L1300,0"/>*/}
                {/*    </svg>*/}
                {/*</div>*/}
                <div className='login'>
                    <h2>博客后台管理系统</h2>
                    <div>
                        <Inputs {...this.state.userName} onChange={(val) => {

                            this.handleInputChangeFn({name: val})
                        }}></Inputs>
                        <Inputs {...this.state.pawName} onChange={(val) => {
                            this.handleInputChangeFn({pwd: val})
                        }}></Inputs>
                        <Inputs {...this.state.VerificationCode} onChange={(val) => {
                            this.handleInputChangeFn({code: val})
                        }}>
                            <span className='code' onClick={this.codeClick}
                                  dangerouslySetInnerHTML={{__html: this.state.codeSvg}}></span>
                        </Inputs>

                        <div className='btn-s'>
                            <button className='sum-btn' onKeyUp={this.keyUp} onClick={this.sumClick}>登录</button>
                        </div>
                    </div>
                </div>
            </div>
        )

    }
}