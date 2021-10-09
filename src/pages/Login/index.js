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
        this.codeClick();
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
                        this.props.history.replace('/login');
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
                            <button className='sum-btn' onClick={this.sumClick}>登录</button>
                        </div>
                    </div>
                </div>
            </div>
        )

    }
}