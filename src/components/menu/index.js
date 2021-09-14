import React, {Component} from 'react'
import {Menu} from 'antd';
// import {nav} from '../../api/home';
import {withRouter} from 'react-router-dom';
const {SubMenu} = Menu;


export default withRouter(class Sider extends Component {
    state = {
        navData: [],
        defaultOpenKeys: [],//默认展开的分类

    };
    handleClick = e => {
        const routerLink = e.key;
        this.props.history.push(`/home/${routerLink}`);
    };

    componentDidMount() {
        // nav().then(res=>{
        //     if(res.status===200&&res.data.length>0){
        //         this.setState({navData:res.data});
        //     }else{
        //         message.error('出现未知错误，请返回登录页。');
        //     }
        // });

    }

    createMenu = () => {
        // const {navData} = this.state;


    }

    render() {
        let pathUrl = this.props.history.location.pathname;
        let defaultOpenKeys = ['sub1'];
        pathUrl = pathUrl.replace('/home/', '');
        switch (pathUrl) {
            case 'share':
            case 'years':
            case 'addArticle':
                defaultOpenKeys=['sub1'];
                break;
            case 'navAdministration':
            case 'imgAdministration':
                defaultOpenKeys=['sub2'];
                break;
            case 'user':
                defaultOpenKeys=['sub3'];
                break;
            default :
                defaultOpenKeys=['sub1'];

        }
        return (
            <Menu
                onClick={this.handleClick}
                selectedKeys={[pathUrl]}
                style={{width: this.props.width}}
                defaultOpenKeys={defaultOpenKeys}
                mode="inline"
                theme='dark'
            >
                <SubMenu key="sub1" title="文章管理">
                    <Menu.Item key="share">
                        {/*<Link to={'/home/share'}>技术分享</Link>*/}
                        技术分享
                    </Menu.Item>
                    <Menu.Item key="years">
                        {/*<Link to={'/home/years'}>岁月年华</Link>*/}
                        岁月年华
                    </Menu.Item>
                    <Menu.Item key="addArticle">
                        {/*<Link to={'/home/addArticle'}>添加文章</Link>*/}
                        添加文章
                    </Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" title="网站管理">
                    <Menu.Item key="navAdministration">
                        {/*<Link to={'/home/navAdministration'}>导航管理</Link>*/}
                        导航管理
                    </Menu.Item>
                    <Menu.Item key="imgAdministration">
                        {/*<Link to={'/home/imgAdministration'}>轮播图管理</Link>*/}
                        轮播图管理
                    </Menu.Item>

                </SubMenu>
                <SubMenu key="sub3" title="用户管理">
                    <Menu.Item key="user">
                        {/*<Link to={'/home/user'}>用户列表</Link>*/}
                        用户列表
                    </Menu.Item>
                </SubMenu>
            </Menu>
        );
    }
})

