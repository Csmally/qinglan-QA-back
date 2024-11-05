import studentAddRoutes from "./studentAdd.js";
import studentSearchRoutes from './studentSearch.js';
import Router from "koa-router";

const router = new Router();

router.use(studentAddRoutes.routes()).use(router.allowedMethods());
router.use(studentSearchRoutes.routes()).use(router.allowedMethods());

export default router;
