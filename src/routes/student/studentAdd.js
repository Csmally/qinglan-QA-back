import Router from "koa-router";
import { Student } from "../../models/index.js";
import { ToastCode } from "../../common/consts/businessCode.js";
import ErrorObj from "../../common/utils/errorObj.js";
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
    throw new ErrorObj(error, "添加用户失败");
  }
});

// 批量添加用户
router.post("/student/addBatch", async (ctx) => {
  try {
    const { students } = ctx.request.body;
    await Student.bulkCreate(students);
    ctx.body = {
      message: "添加用户成功",
      toastCode: ToastCode.success,
    };
  } catch (error) {
    throw new ErrorObj(error, "添加用户失败");
  }
});

export default router;
