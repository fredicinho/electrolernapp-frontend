const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        createProxyMiddleware("/api", { target: "http://wiproh20-owerlen.enterpriselab.ch:8080" })
    );
};