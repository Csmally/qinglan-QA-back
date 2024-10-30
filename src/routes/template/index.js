import templateAddRoutes from "./templateAdd.js";
import templateSearchRoutes from "./templateSearch.js";
import Router from "koa-router";

const router = new Router();

router.use(templateAddRoutes.routes()).use(router.allowedMethods());
router.use(templateSearchRoutes.routes()).use(router.allowedMethods());

export default router;
