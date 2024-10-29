import Router from "koa-router";

const router = new Router();

router.get("/users", async (ctx) => {
  ctx.body = { message: "获取所有用户" };
});

router.post("/users", async (ctx) => {
  ctx.body = { message: "创建用户" };
});

export default router;
