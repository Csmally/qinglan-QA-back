import Router from "koa-router";
import { Classes } from "../../models/index.js";
import { ToastCode } from "../../common/consts/businessCode.js";
const router = new Router();

// 添加班级
router.post("/class/add", async (ctx) => {
  try {
    const { classInfo } = ctx.request.body;
    await Classes.create(classInfo);
    ctx.body = {
      message: "添加班级成功",
      toastCode: ToastCode.success,
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      message: "添加班级失败",
    };
  }
});

export default router;
