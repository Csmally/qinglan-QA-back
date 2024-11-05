import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import { initDb } from "./src/models/index.js";
import cors from "@koa/cors";
import businessRoutes from "./src/routes/index.js";
import formatResponseData from "./src/common/utils/formatData.js";
import errorHandler from "./src/common/utils/errorHandler.js";

const app = new Koa();
const router = new Router({
  prefix: "/ql/api",
});

// 中间件
app.use(bodyParser());
// 使用 CORS 中间件，允许所有源访问
app.use(cors());
// 初始化数据库
initDb();

// 错误处理中间件
app.use(errorHandler);

app.use(formatResponseData);

router.use(businessRoutes.routes()).use(router.allowedMethods());

app.use(router.routes()).use(router.allowedMethods());

const isProd = process.env.NODE_ENV === "production" ? true : false;
const port = isProd ? 8088 : 3000;
app.listen(port);
