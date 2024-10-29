import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import { initDb } from "./src/models/index.js";
import cors from "@koa/cors";
import templateRoutes from "./src/routes/templates.js";
import { formatResponseData } from "./src/common/utils/formatData.js";

const app = new Koa();
const router = new Router({
  prefix: "/qldev",
});

// 中间件
app.use(bodyParser());
// 使用 CORS 中间件，允许所有源访问
app.use(cors());
// 初始化数据库
initDb();

app.use(formatResponseData);

router.use(templateRoutes.routes()).use(router.allowedMethods());

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
