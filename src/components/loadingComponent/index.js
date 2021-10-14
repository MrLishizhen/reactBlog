import { Spin } from 'antd';
// import Loadable from "react-loadable";

import './index.css'

export default function loadingComponent(){
    return(
        <div className={'loadBox'}><div className={'load'}><Spin size="large" /></div></div>
    )
}