import Axios from '../util/http'
import cookie from 'js-cookie';
//用户信息
export function getUser(){
    return Axios({
        url:'/admin/dllogin',
        headers:{
            Authorization:cookie.get("userToken")
        },
        method:'POST',
        loading:false,
        GetShow: false
    });
}
//导航权限
export function nav(){
    return Axios({
        url:'/admin/nav',
        methods:'GET',
        headers:{
            Authorization:cookie.get("userToken")
        },
        loading:false,
    });
}

//获取文章表格数据
export function getTable(data){
    return Axios({
        url:'/admin/share/gettable',
        headers:{
            Authorization:cookie.get("userToken")
        },
        data:data,
        method:'POST',
        loading:false,
        GetShow: false
    })
}