import classAddRoutes from "./classAdd.js";
import classSearchRoutes from "./classSearch.js";
import Router from "koa-router";

const router = new Router();

router.use(classAddRoutes.routes()).use(router.allowedMethods());
router.use(classSearchRoutes.routes()).use(router.allowedMethods());

export default router;
