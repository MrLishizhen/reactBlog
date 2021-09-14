import React, {Component} from "react";
import '../Home/index.css'
import Headers from '../../components/LayoutHeader'
import Menu from '../../components/menu'
import {Route, Switch} from 'react-router-dom';

//引入路由所对应的组件

import share from '../Share';
import years from '../Years';
import addArticle from '../AddArticle';
import navAdministration from '../NavAdministration';
import imgAdministration from '../ImgAdministration';
import user from '../User';
import empty from '../404'

export default class Home extends Component {

    render() {
        const {history} = this.props;

        return (

            <div className='home-box'>
                {/*顶部导航栏*/}
                <Headers></Headers>
                <main>
                    {/*左侧导航栏*/}
                    <div className='leftMenu'>
                        <Menu width='200' history={history}></Menu>
                    </div>
                    {/*右侧内容区*/}
                    <div className='rightMain'>
                        <Switch>
                            <Route  path='/home/share' component={share}></Route>
                            <Route  path='/home/years' component={years}></Route>
                            <Route  path='/home/addArticle' component={addArticle}></Route>
                            <Route  path='/home/navAdministration' component={navAdministration}></Route>
                            <Route  path='/home/imgAdministration' component={imgAdministration}></Route>
                            <Route  path='/home/user' component={user}></Route>
                            <Route  path='*' component={empty}></Route>
                        </Switch>
                    </div>
                </main>
            </div>

        )
    }
}
