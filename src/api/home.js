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
//上传文章/addarticle
export function addarticle(data){
    return Axios({
        url:'/admin_article/addarticle',
        data:data,
        headers:{
            Authorization:cookie.get("userToken")
        },
        method:'POST',
        loading:false,
        GetShow: false
    });
}

export function uploadImge(data){
    return Axios({
        url:'/admin_article/addArticleImg',
        data:data,
        headers:{
            Authorization:cookie.get("userToken")
        },
        method:'POST',
        loading:false,
        GetShow: false
    });
}
//删除文章
export function deleteTable(data){
    return Axios({
        url:'/admin/share/deleteArticle',
        headers:{
            Authorization:cookie.get("userToken")
        },
        data:data,
        method:'POST',
        loading:true,
        GetShow: false
    })
}
//展示或者显示文章
export function setTableHot(data){
    return Axios({
        url:'/admin/share/setarticle_is',
        headers:{
            Authorization:cookie.get("userToken")
        },
        data:data,
        method:'POST',
        loading:true,
        GetShow: false
    })
}

//获取文章详情编辑使用
export function getDefault(data){
    return Axios({
        url:'/admin/share/getDefault',
        headers:{
            Authorization:cookie.get("userToken")
        },
        data:data,
        method:'POST',
        loading:true,
        GetShow: false
    })
}
//修改文章
export function setarticle(data){
    return Axios({
        url:'/admin_article/setarticle',
        data:data,
        headers:{
            Authorization:cookie.get("userToken")
        },
        method:'POST',
        loading:false,
        GetShow: false
    });
}
//获取用户权限表
export function getUserTabe(data){
    return Axios({
        url:'/adminUser/user/getTable',
        headers:{
            Authorization:cookie.get("userToken")
        },
        data:data,
        method:'POST',
        loading:true,
        GetShow: false
    })
}

//删除用户
export function removeuser(data){
    return Axios({
        url:'/adminUser/user/removeUser',
        headers:{
            Authorization:cookie.get("userToken")
        },
        data:data,
        method:'POST',
        loading:true,
        GetShow: false
    })
}

//添加用户

export function setuser(data){
    return Axios({
        url:'/adminUser/user/addUser',
        headers:{
            Authorization:cookie.get("userToken")
        },
        data:data,
        method:'POST',
        loading:true,
        GetShow: false
    })
}


