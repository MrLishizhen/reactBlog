import React, {Component} from 'react'
import {Menu} from 'antd';
// import {nav} from '../../api/home';
import {withRouter} from 'react-router-dom';
const {SubMenu} = Menu;



export default withRouter(class Sider extends Component {


    state = {
        navData: [],
        defaultOpenKeys: [],//默认展开的分类
        navarr:[
            {key:'sub1',title:'文章管理'},
            {key:'share',title:'技术分享'},
            {key:'years',title:'岁月年华'},
            {key:'addArticle',title:'添加文章'},
            {key:'sub2',title:'网站管理'},
            {key:'navAdministration',title:'导航管理'},
            {key:'imgAdministration',title:'轮播图管理'},
            {key:'sub3',title:'用户管理'},
            {key:'user',title:'用户列表'},
            {key:'userRole',title:'用户权限'},
        ],
        defaultNav:[]
    };
    handleClick = (option) => {
        let {onChange} = this.props;

        onChange(this.getNav(option.keyPath).reverse());
        const routerLink = option.key;
        this.props.history.push(`/home/${routerLink}`);
    };
    getNav=(arr)=>{
        let data = [];
        for(let i = 0;i<arr.length;i++){
            let datas = this.state.navarr.find(item=>item.key === arr[i]).title;
            data.push(datas);
        }
        return data;
    }
    componentDidMount() {
        // nav().then(res=>{
        //     if(res.status===200&&res.data.length>0){
        //         this.setState({navData:res.data});
        //     }else{
        //         message.error('出现未知错误，请返回登录页。');
        //     }
        // });
        let {onChange} = this.props;
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
            case 'userRole' :
            case 'user':
                defaultOpenKeys=['sub3'];
                break;
            default :
                defaultOpenKeys=['sub1'];

        }
        onChange(this.getNav([pathUrl,...defaultOpenKeys].reverse()));
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
            case 'userRole' :
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
                    <Menu.Item key="userRole">
                        {/*<Link to={'/home/user'}>用户列表</Link>*/}
                        后台权限
                    </Menu.Item>
                </SubMenu>
            </Menu>
        );
    }
})

