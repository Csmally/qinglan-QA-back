import Router from "koa-router";
import templateRoutes from "./template/index.js";
const router = new Router();

router.use(templateRoutes.routes()).use(router.allowedMethods());

export default router;
