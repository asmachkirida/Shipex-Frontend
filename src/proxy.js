// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:8080', // Backend server URL
            changeOrigin: true,
        })
    );
};