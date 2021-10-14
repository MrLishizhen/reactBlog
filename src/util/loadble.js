import Loadable from 'react-loadable';

import loadingComponent from '../components/loadingComponent';
//export default导出函数时，将它赋值给一个变量，然后导出
const loadbleFunc = (loader, loading = loadingComponent)=> {
    return Loadable({
        loader,
        loading,
    });
};

// 当不传加载动画时候使用默认的加载动画
export default loadbleFunc;