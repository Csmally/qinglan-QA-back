import userUpdateRoutes from "./userUpdate.js";
import Router from "koa-router";

const router = new Router();

router.use(userUpdateRoutes.routes()).use(router.allowedMethods());

export default router;
