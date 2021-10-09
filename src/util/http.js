import React from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import cookie from 'js-cookie'

import { message, Spin } from 'antd';
import qs from 'qs';





import {createTimestamp} from '../api'

let loadingInstance = false; // loading实例是否存在
let needLoadingRequestCount = 0; //当前正在请求的数量

//展开loading效果
function shouLoading(){
    loadingInstance=true;
    var dom = document.createElement('div')
    dom.setAttribute('id', 'loading')
    document.body.appendChild(dom)
    ReactDOM.render(<Spin tip="加载中..." size="large"/>, dom)
}
//关闭loading

function removeLoading(){
    if (needLoadingRequestCount === 0) {
        loadingInstance=false;
        if(document.getElementById('loading')){
            document.body.removeChild(document.getElementById('loading'))
        }
    }
}


//路由请求拦截
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Axios.defaults.baseURL = '/api'
// Axios.defaults.headers.post['Authorization'] = cookie.get("userToken");
Axios.interceptors.request.use(config=>{
    //如果为0则重新创建loading
    //get请求添加时间戳

    if(config.method==='get'&&config.GetShow){
        config.url = config.url+"?"+createTimestamp();
    }else if(config.method==='POST'){
        // config.data = qs.stringify(config.data);

    }

    if(config.loading){
        if(needLoadingRequestCount===0){
            shouLoading()
        }
        //计数
        needLoadingRequestCount++;
    }
    // console.log(config);
    if(config.headers["Content-Type"] !== "multipart/form-data"){

    }else{
        config.data = qs.stringify(config.data);
    }

    return config

},error=>{
    loadingInstance && removeLoading();
    return Promise.reject(error.response);
})

//响应拦截
Axios.interceptors.response.use(response=>{
        // console.log(response);
        // console.log(loadingInstance,123);

        //计数减少
        if(response.config.loading){
            needLoadingRequestCount--;
            //判断needLoadingRequestCount的数值
            needLoadingRequestCount = needLoadingRequestCount<0?0:needLoadingRequestCount;
            //计数等于0并且有值则关闭loading
            needLoadingRequestCount === 0 && loadingInstance && removeLoading();
        }

        // console.log(response)
        if(response.data.status===401){
            // console.log(1);
            needLoadingRequestCount=0;
            // response.data.message='权限验证失败，请重新登录'
            message.error('登录失效，请重新登录');

            //清除状态
            setTimeout(()=>{

                removeLoading();
                cookie.remove('userToken');
                //判断是不是在登录页登录失败
                if(window.location.pathname!=='/login'){
                    window.location.replace('/login');
                }

            },1000)

        }
        return response.data;
        // else if(response.data.status===199){
        //     Message.error(response.data.message);
        // }



    },
    error=>{

        if (loadingInstance) {
            needLoadingRequestCount--;
            needLoadingRequestCount = needLoadingRequestCount < 0 ? 0 : needLoadingRequestCount;
            needLoadingRequestCount === 0 && loadingInstance && removeLoading(); //关闭加载动画
        }

        message.error('请求数据失败');
        return Promise.reject(error.response);
    })

export default  Axios;