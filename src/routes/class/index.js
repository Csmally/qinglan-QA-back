import classAddRoutes from "./classAdd.js";
import Router from "koa-router";

const router = new Router();

router.use(classAddRoutes.routes()).use(router.allowedMethods());

export default router;
