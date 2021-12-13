import React from 'react';



const globalContext = React.createContext({});
const {Provider} = globalContext;

function GetUser(props: any) {
    let user = {};
    let {history} = props;
    user = JSON.parse(sessionStorage.getItem('user') || '{}');

    if (JSON.stringify(user) === '{}' && history?.location.pathname !== '/login') {
        window.location.replace('/servere/login');

    }
    return (
        <Provider value={{user}}>
            {props.children}
        </Provider>
    )
}

export {GetUser, globalContext}