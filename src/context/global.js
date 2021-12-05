import React from 'react';


const globalContext = React.createContext({
    breadcrumb:[
        '文章管理'
    ]
});

export const { Provider, Consumer } = globalContext;