import Router from "koa-router";
import { Student } from "../../models/index.js";
import { ToastCode } from "../../common/consts/businessCode.js";
const router = new Router();

// 添加用户
router.post("/student/add", async (ctx) => {
  try {
    const { student } = ctx.request.body;
    await Student.create(student);
    ctx.body = {
      message: "添加用户成功",
      toastCode: ToastCode.success,
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      message: "添加用户失败",
    };
  }
});

export default router;
