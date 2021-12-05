
import cookie from "js-cookie";

export function navChildren(data){
    let navData = data;
    let nav = [];
    //拿出一级
    for(let i = 0;i<navData.length;i++){
        let data = {};
        if(navData[i].fid===0){
            data=navData[i];
            nav.push(data);
        }

    }
    //拿出二级
    for(let i = 0;i<navData.length;i++){
        for(let j= 0;j<nav.length;j++){
            if(nav[j].id===navData[i].fid){
                if(nav[j].children){
                    nav[j].children.push(navData[i]);
                }else{
                    nav[j].children = [];
                    nav[j].children.push(navData[i]);
                }
            }
        }
    }

    return nav;
}

//深拷贝方式
export function deepClone(obj){
    let objClone = JSON.stringify(obj);
    // //判断是对象还是数组
    // var objClone = Array.isArray(obj)?[]:{};
    // //判断obj是一个对象
    // if(obj && typeof obj ==="object"){
    //     //遍历obj的key值
    //     for(key in obj){
    //         //确认拿到的不是obj继承来的属性
    //         if(obj.hasOwnProperty(key)){
    //             //如果说obj的属性或者方法也是一个对象的话
    //             if(obj[key] && typeof obj[key] === "object"){
    //                 //调用自身，把key值传进去
    //                 objClone[key] = deepClone(obj[key]);
    //             }else{
    //                 //说明仅仅是个属性
    //                 objClone[key] = obj[key];
    //             }
    //         }
    //     }
    // }
    //return 拷贝后的对象
    return JSON.parse(objClone);
}
export function deepClones(target) {
    // 定义一个变量
    let result;
    // 如果当前需要深拷贝的是一个对象的话
    if (typeof target === 'object') {
        // 如果是一个数组的话
        if (Array.isArray(target)) {
            result = []; // 将result赋值为一个数组，并且执行遍历
            for (let i in target) {
                // 递归克隆数组中的每一项
                result.push(deepClone(target[i]))
            }
            // 判断如果当前的值是null的话；直接赋值为null
        } else if(target===null) {
            result = null;
            // 判断如果当前的值是一个RegExp对象的话，直接赋值
        } else if(target.constructor===RegExp){
            result = target;
        }else {
            // 否则是普通对象，直接for in循环，递归赋值对象的所有值
            result = {};
            for (let i in target) {
                result[i] = deepClone(target[i]);
            }
        }
        // 如果不是对象的话，就是基本数据类型，那么直接赋值
    } else {
        result = target;
    }
    // 返回最终结果
    return result;
}
//生成路由
// export function addRouters(data){
//     let arr = [];
//         let home= {
//             path:'/Home',
//             name:"Home",
//             component:layout,
//         }
//         home.children=[];
//         let routerLinks = data.filter(item=>item.routerName!='');
//
//         routerLinks.forEach((item,i)=>{
//             let data = {
//                 path:item.routerName,
//                 component:()=>import(`@/views/${item.routerName}/index.vue`),
//                 name:item["routerName"]+i.toString()
//             };
//
//             home.children.push(data);
//         });
//         arr.push(home);
//         return arr;
// }

//退出登录
export function unLogin(){
    sessionStorage.removeItem("user");
    cookie.remove("userToken");

}
export function menuArr(arr){
    let array = arr;
    let index = 0;
    // let array =[{"id":1,"name":"文章管理","fid":0,"icon":"el-icon-notebook-1","routerUrl":"","routerName":""},{"id":2,"name":"网站管理","fid":0,"icon":"el-icon-s-tools","routerUrl":"","routerName":""},{"id":3,"name":"用户管理","fid":0,"icon":"el-icon-user-solid","routerUrl":"","routerName":""},{"id":4,"name":"随心贴","fid":1,"icon":"el-icon-first-aid-kit","routerUrl":"/Home/heart","routerName":"heart"},{"id":5,"name":"技术分享","fid":1,"icon":"el-icon-connection","routerUrl":"/Home/share","routerName":"share"},{"id":6,"name":"岁月年华","fid":1,"icon":"el-icon-date","routerUrl":"/Home/years","routerName":"years"},{"id":7,"name":"添加文章","fid":1,"icon":"el-icon-edit","routerUrl":"/Home/addArticle","routerName":"addArticle"},{"id":8,"name":"导航管理","fid":2,"icon":"el-icon-collection","routerUrl":"/Home/navAdministration","routerName":"navAdministration"},{"id":9,"name":"轮播图管理","fid":2,"icon":"el-icon-picture","routerUrl":"/Home/imgAdministration","routerName":"imgAdministration"},{"id":10,"name":"用户列表","fid":3,"icon":"el-icon-document","routerUrl":"/Home/user","routerName":"user"},{"id":11,"name":"后台权限","fid":3,"icon":"el","routerUrl":"/Home/userRole","routerName":"userRole"}]
    function getArrChildren(){
        let topItems = array.filter(item => item.fid === 0);
        //找出了所有的一级属性
        for (let i = 0; i < topItems.length;i++) {
            topItems[i].index = index;
            getItems(topItems[i]);
            index=0;
        }

        return topItems;

    }
    function getItems(node) {

        let children = array.filter(item => item.fid === node.id);
        if (children.length === 0) return;
        else {
            node.children = [];
            index++;
            children.forEach(item => {
                item.index = index;
                getItems(item,array);
                node.children.push(item);
            })
        }

    };

    return getArrChildren();
}

