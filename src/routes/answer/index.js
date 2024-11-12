import answerAddRoutes from "./answerAdd.js";
import answerSearchRoutes from "./answerSearch.js";
import Router from "koa-router";

const router = new Router();

router.use(answerAddRoutes.routes()).use(router.allowedMethods());
router.use(answerSearchRoutes.routes()).use(router.allowedMethods());

export default router;
