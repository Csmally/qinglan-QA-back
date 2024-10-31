import customerAddRoutes from "./customerAdd.js";
import customerSearchRoutes from "./customerSearch.js";
import Router from "koa-router";

const router = new Router();

router.use(customerAddRoutes.routes()).use(router.allowedMethods());
router.use(customerSearchRoutes.routes()).use(router.allowedMethods());

export default router;
