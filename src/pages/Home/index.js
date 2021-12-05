import React, {Component} from "react";
import '../Home/index.css'
import Headers from '../../components/LayoutHeader'
import Menu from '../../components/menu'
import {Route, Switch} from 'react-router-dom';
import {nav} from '../../api/home'
//引入路由所对应的组件

import share from '../Share';
import years from '../Years';
import addArticle from '../AddArticle';
import navAdministration from '../NavAdministration';
import imgAdministration from '../ImgAdministration';
import user from '../User';
import userRole from '../userRole';
import empty from '../404'

import {Provider} from '../../context/global';

export default class Home extends Component {

    state = {
        breadcrumb: []
    }

    componentDidMount() {
        //初始化获取数据
        nav().then(res => {
            console.log(1);
            console.log(res);
        })
    }

    //顶部导航栏
    onChangeBreadcrumb = (data) => {

        this.setState({
            breadcrumb: [...data]
        })

    }

    render() {
        const {history} = this.props;
        console.log(this.context);
        return (
            <Provider value={{}}>
                <div className='home-box'>
                    {/*顶部导航栏*/}
                    <Headers data={this.state.breadcrumb}></Headers>
                    <main>
                        {/*左侧导航栏*/}
                        <div className='leftMenu'>
                            <Menu width='200' history={history} onChange={(val) => this.onChangeBreadcrumb(val)}></Menu>
                        </div>
                        {/*右侧内容区*/}
                        <div className='rightMain'>
                            <Switch>
                                <Route path='/home/share' component={share}></Route>
                                <Route path='/home/years' component={years}></Route>
                                <Route path='/home/addArticle' component={addArticle}></Route>
                                <Route path='/home/navAdministration' component={navAdministration}></Route>
                                <Route path='/home/imgAdministration' component={imgAdministration}></Route>
                                <Route path='/home/user' component={user}></Route>
                                <Route path='/home/userRole' component={userRole}></Route>
                                <Route path='*' component={empty}></Route>
                            </Switch>
                        </div>
                    </main>
                </div>
            </Provider>
        )
    }
}
