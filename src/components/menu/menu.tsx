import React, {Component, lazy, Suspense} from "react";
import {Menu, message} from "antd";
import {nav} from "../../api/home";
import {deepClones, menuArr} from "../../util/func";

const {withRouter, Switch, Route} = require('react-router-dom');
const {SubMenu} = Menu;

//验证menu对象属性
interface navData {
    fid: number,
    icon: string,
    children: navData[],
    id: number,
    name: string
    routerName: string
    routerUrl: string
}

export default withRouter(class Sider extends Component<{ history: any , onChange:any}> {
    state = {
        navList: [],//原始数据
        childrenData: [],//父子级数据
        selectedKeys: [],
        defaultOpenKeys: [],
    }

    componentDidMount() {

        this.getNav();
    }

    //设置导航栏
    setMenu = (data: navData[]) => {
        return data.map((item: navData, index: number) => {
            if (item.children) {
                return (<SubMenu key={('menu' + item.id)} title={item.name}>
                    {this.setMenu(item.children)}
                </SubMenu>)
            } else {
                return (
                    <Menu.Item key={item.routerName}>
                        {/*<Link to={'/home/share'}>技术分享</Link>*/}
                        {item.name}
                    </Menu.Item>
                )
            }
        })
    }


    //请求数据
    getNav = async () => {
        let {onChange} = this.props;
        let result = await nav();
        if (result.status === 200) {

            this.setState({navList: result.data});//保存原始数据

            //深拷贝数据
            let data = deepClones(result.data);
            // console.log(this.props.history);
            let selectedKeys: string = this.props.history.location.pathname.replace('/home/', '');

            let defaultOpenKeys: string[] = this.getParent(result.data, selectedKeys);

            let breadcrumb = this.getBreadcrumb([selectedKeys,...defaultOpenKeys]);
            onChange(breadcrumb);
            this.setState({childrenData: menuArr(data), selectedKeys, defaultOpenKeys});
        } else {
            message.error('数据请求失败，请刷新后重试');
        }
    }
    //获取当前的导航信息
    getBreadcrumb = (a:string[])=>{
        let data = [];
        let navList:navData[] = this.state.navList;
        for(let i = 0;i<a.length;i++){
            for(let j = 0;j<navList.length;j++){
                if(navList[j].routerName === a[i]||`menu${navList[j].id}` === a[i]){
                    data.push(navList[j].name);
                    break;
                }
            }
        }
        return data;
    }
    //寻找父集路由
    getParent = (data: navData[], pathName: string): string[] => {
        let pathNames: string[] = [];
        let datas: any = data.find(item => item.routerName === pathName);
        let gets = (fid: number) => {
            let fiddatas: any = data.find(item => item.id === fid);
            pathNames.push('menu' + fiddatas.id);
            if (fiddatas.fid !== 0) {
                gets(fiddatas.fid);
            }
        }
        if (datas.fid === 0) {
            pathNames.push('menu' + datas.id);
        } else {
            gets(datas.fid);
        }

        return pathNames;
    }

    //生成路由
    setRoutes = (data: navData[]) => {

        return data.map((item, index, arr) => {
            if (item.fid !== 0) {
                if (index !== arr.length - 1 && item.routerUrl !== 'el') {
                    return <Route path={`/home/${item.routerName}`} key={item.name}
                                  component={lazy(() => import(`../../pages/${item.routerName}`))}></Route>
                } else if (index === arr.length - 1) {
                    return <Route path={`*`} key={item.routerName}
                                  component={lazy(() => import(`../../pages/404`))}></Route>
                } else {
                    return <Route path={`/home/${item.routerName}`} key={item.name}
                                  component={lazy(() => import(`../../pages/404`))}></Route>
                }
            } else {
                return '';
            }

        })
    }
    handleClick = (option:any):void=> {
        //点击后更新上面的导航提示
        let {onChange} = this.props;
        let breadcrumb = this.getBreadcrumb([...option.keyPath]);
        onChange(breadcrumb);
        //正常跳转
        const routerLink = option.key;
        this.props.history.push(`/home/${routerLink}`);
    };

    render() {
        let defaultSelectedKeys = this.state.selectedKeys;
        let defaultOpenKeys = this.state.defaultOpenKeys;
        return (
            <>
                {/*左侧导航栏*/}
                <div className='leftMenu'>
                    {defaultOpenKeys.length > 0
                        ?
                        <Menu
                            onClick={this.handleClick}
                            defaultSelectedKeys={defaultSelectedKeys}
                            defaultOpenKeys={defaultOpenKeys}
                            style={{width: 200}}
                            mode="inline"
                            theme='dark'
                        >
                            {this.setMenu(this.state.childrenData)}
                        </Menu>
                        : ''
                    }
                </div>

                <div className='rightMain'>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Switch>
                            {
                                this.setRoutes(this.state.navList)
                            }
                        </Switch>
                    </Suspense>
                </div>
            </>
        )

    }
})