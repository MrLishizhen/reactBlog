import React,{Component} from 'react';
import logoImg from './img/logo.png'

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

    render(){
        return(
            <header>
                <div className='logo'>
                    <img src={logoImg} alt="logo"/>
                </div>
                <div className='breadcrumb'></div>
                <div className='avatar-box'>
                    <div className='avatar-user'>
                        <span className='avatar'></span>
                        <span className='user-name'><i className='name'>{this.state.userName}</i>欢迎你...</span>
                    </div>
                    <ul className='avatar-ul'>
                        <li className='avatar-li'>账号设置</li>
                        <li className='avatar-li'>退出账号</li>
                    </ul>
                </div>
            </header>
        )

    }
}