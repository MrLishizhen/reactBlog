import React,{Component} from 'react';
import logoImg from './img/logo.png'
import {unLogin} from "../../util/func";
import BreadcrumbLi from '../Breadcrumb_li/index'
export default class Header extends Component{

    state = {
        userName:'',
    }
    getUser=()=>{
        const user = JSON.parse(sessionStorage.getItem('user'));
        this.setState({
            userName:user.name
        })
    }
    componentDidMount(){
        this.getUser();
    }
    toLogin=()=>{
        window.location.replace('/login');
        unLogin();
    }
    render(){
        return(
            <header>
                <div className='logo'>
                    <img src={logoImg} alt="logo"/>
                </div>
                <div className='breadcrumb'>

                    {/*顶部面包屑*/}
                    {/*<BreadcrumbLi></BreadcrumbLi>*/}
                </div>
                <div className='avatar-box'>
                    <div className='avatar-user'>
                        <span className='avatar'></span>
                        <span className='user-name'><i className='name'>{this.state.userName}</i>欢迎你...</span>
                    </div>
                    <ul className='avatar-ul'>
                        <li className='avatar-li'>账号设置</li>
                        <li className='avatar-li' onClick={this.toLogin}>退出账号</li>
                    </ul>
                </div>
            </header>
        )

    }
}