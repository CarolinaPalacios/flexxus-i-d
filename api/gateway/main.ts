import express from "express";
import morgan from "morgan";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();

app.use(morgan("dev"));

app.use(
  "/auth",
  createProxyMiddleware({ target: "http://auth:3001", changeOrigin: true })
);

app.use(
  "/articles",
  createProxyMiddleware({ target: "http://articles:3002", changeOrigin: true })
);

app.listen(3000, () => {
  console.log("Gateway service up and running on port 3000");
});
