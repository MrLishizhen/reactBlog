import Axios from '../util/http'
export function captcha (){
    return Axios({
        url:'/admin/captcha',
        method:'GET',
        loading:false,
        GetShow: false
    });
}

//登录
export function login(data){
    data.captcha=data.captcha.toLowerCase();
    return Axios({
        url:'/admin/login',
        method:'POST',
        data:data,
        loading:false,
        GetShow: false
    });
}