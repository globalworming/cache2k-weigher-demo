const { createProxyMiddleware }  = require("http-proxy-middleware");

module.exports = app => {
  app.use(createProxyMiddleware("/ws", {target: "http://localhost:8080/", ws: true}));
  app.use(createProxyMiddleware("/api", {target: "http://localhost:8080/"}));
};