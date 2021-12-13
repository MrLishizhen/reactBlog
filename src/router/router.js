
import {Route, Switch} from 'react-router-dom';
import {loadble} from "../util/loadble";

const years = loadble(()=>import('../pages/years'));
const share = loadble(()=>import('../pages/share'));
const addArticle = loadble(()=>import('../pages/addArticle'))
const navAdministration = loadble(()=>import('../pages/navAdministration'))
const imgAdministration = loadble(()=>import('../pages/imgAdministration'))
const user = loadble(()=>import('../pages/user'))
const empty = loadble(()=>import('../pages/404'))
// const data = [{"id":1,"name":"文章管理","fid":0,"icon":"el-icon-notebook-1","routerUrl":"","routerName":""},{"id":2,"name":"网站管理","fid":0,"icon":"el-icon-s-tools","routerUrl":"","routerName":""},{"id":3,"name":"用户管理","fid":0,"icon":"el-icon-user-solid","routerUrl":"","routerName":""},{"id":4,"name":"随心贴","fid":1,"icon":"el-icon-first-aid-kit","routerUrl":"/Home/heart","routerName":"heart"},{"id":5,"name":"技术分享","fid":1,"icon":"el-icon-connection","routerUrl":"/Home/share","routerName":"share"},{"id":6,"name":"岁月年华","fid":1,"icon":"el-icon-date","routerUrl":"/Home/years","routerName":"years"},{"id":7,"name":"添加文章","fid":1,"icon":"el-icon-edit","routerUrl":"/Home/addArticle","routerName":"addArticle"},{"id":8,"name":"导航管理","fid":2,"icon":"el-icon-collection","routerUrl":"/Home/navAdministration","routerName":"navAdministration"},{"id":9,"name":"轮播图管理","fid":2,"icon":"el-icon-picture","routerUrl":"/Home/imgAdministration","routerName":"imgAdministration"},{"id":10,"name":"用户列表","fid":3,"icon":"el-icon-document","routerUrl":"/Home/user","routerName":"user"}]


// import empty from "../pages/404";
// export function setRouter(data){
//     //处理成父子关系
// }
// const getChildren =(data)=>{
//     const router = [];
//
//     for(let i = 0;i<data.length;i++){
//         if()
//     }
// }
// <Route  path='/home/share' component={share}></Route>
// <Route  path='/home/years' component={years}></Route>
// <Route  path='/home/addArticle' component={addArticle}></Route>
// <Route  path='/home/navAdministration' component={navAdministration}></Route>
// <Route  path='/home/imgAdministration' component={imgAdministration}></Route>
// <Route  path='/home/user' component={user}></Route>
// <Route  path='*' component={empty}></Route>
// const InItData = [
//     {
//         name:'login',
//         component:
//     }
// ]
const setInItRouter =()=>{
    return(
        <Switch>
             <Route  path='/home/share' component={share}></Route>
             <Route  path='/home/years' component={years}></Route>
             <Route  path='/home/addArticle' component={addArticle}></Route>
             <Route  path='/home/navAdministration' component={navAdministration}></Route>
             <Route  path='/home/imgAdministration' component={imgAdministration}></Route>
             <Route  path='/home/user' component={user}></Route>
             <Route  path='*' component={empty}></Route>
        </Switch>
    )
}

export default setInItRouter