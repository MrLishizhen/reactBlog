import React from 'react';


const ProductContext = React.createContext({
    breadcrumb:[
        '文章管理'
    ]
});

export const { Provider, Consumer } = ProductContext;