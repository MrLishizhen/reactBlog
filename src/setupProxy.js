const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(createProxyMiddleware('/api', {
        // target: 'http://47.94.12.253:3307' ,
        target: 'http://localhost:3000',
        secure: false,
        changeOrigin: true,
        pathRewrite: {
            "^/api": "/"
        },
        cookieDomainRewrite: "http://localhost:3000"
    }));
};