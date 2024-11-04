import Router from "koa-router";
import templateRoutes from "./template/index.js";
import customerRoutes from "./customer/index.js";
import classRoutes from "./class/index.js";

const router = new Router();

router.use(templateRoutes.routes()).use(router.allowedMethods());
router.use(customerRoutes.routes()).use(router.allowedMethods());
router.use(classRoutes.routes()).use(router.allowedMethods());

export default router;
