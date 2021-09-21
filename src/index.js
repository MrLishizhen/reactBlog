import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';

ReactDOM.render(
    // <React.StrictMode> 在antd的menu中会出现ref错误，可以删掉
        <BrowserRouter>
            <ConfigProvider locale={zhCN}>
            <App/>
            </ConfigProvider>
        </BrowserRouter>
    // </React.StrictMode>,
    ,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
