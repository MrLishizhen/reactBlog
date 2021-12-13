import React, {useEffect, useState, Suspense, lazy} from 'react';
import { Route, Switch} from "react-router-dom";
import {Menu} from "antd";

import {deepClones, menuArr} from "../../util/func";
import {nav} from "../../api/home";

const {SubMenu} = Menu;

export default function MenuCom(props) {
    //保存数组原始数据
    const [navList, setNavList] = useState([]);
    //保存menu结构的数组
    const [defaultSelectedKeys,setDefaultSelectedKeys] = useState(props.history.location.pathname.replace('/home/', ''));
    const [defaultOpenKeys,setDefaultOpenKeys] = useState('');
    const [childrenData, setChildrenData] = useState([]);

    useEffect(() => {
        let getMenu = async () => {
            let res = await nav();
            if (res.status === 200) {
                let routerArr = res.data.filter(item => item.routerUrl !== '');
                setNavList([...routerArr,{routerName:'empty'}]);
                const result = deepClones(res.data);
                setDefaultOpenKeys(`menu${result[0]?.id}`)
                //根据当前路径找到自己
                setChildrenData(menuArr(result));
            }
        }
        getMenu();

    }, []);
    useEffect(() => {


    }, [defaultSelectedKeys]);
    const setMenu = (data) => {
        return data.map((item, index) => {
            if (item.children) {
                return (<SubMenu key={('menu' + item.id)} title={item.name}>
                    {setMenu(item.children)}
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
    //点击跳转
    const handleClick = (option) => {
        console.log(123456)
        const routerLink = option.key;
        setDefaultSelectedKeys(props.history.location.pathname.replace('/home/', ''));
        props.history.push(`/home/${routerLink}`);
    };

    return (
        <>
            {/*左侧导航栏*/}
            <div className='leftMenu'>
                <Menu
                    onClick={handleClick}
                    selectedKeys={[defaultSelectedKeys]}
                    defaultOpenKeys = {[defaultOpenKeys]}
                    // selectedKeys={[pathUrl]}
                    style={{width: 200}}
                    // openKeys={[openKeys]}
                    mode="inline"
                    theme='dark'
                >
                    {setMenu(childrenData)}
                </Menu>
            </div>
            {/*右侧内容区*/}
            <div className='rightMain'>
                <Suspense fallback={<div>Loading...</div>}>
                    <Switch>
                        {
                            navList.map((item,index,arr) => {
                                if(index!==arr.length-1&&item.routerUrl!=='el'){
                                    return <Route path={`/home/${item.routerName}`} key={item.name} component={lazy(() => import(`../../pages/${item.routerName}`))}></Route>
                                }else if(index===arr.length-1){
                                    return <Route path={`*`} key={item.routerName} component={lazy(() => import(`../../pages/404`))}></Route>
                                }else{
                                    return <Route path={`/home/${item.routerName}`} key={item.name} component={lazy(() => import(`../../pages/404`))}></Route>
                                }
                            })
                        }
                    </Switch>
                </Suspense>
            </div>
        </>
    )
}