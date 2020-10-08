const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        createProxyMiddleware("/api", { target: "http://demo_app_prod:8080" })
    );
};
