import Router from "koa-router";
import { Customer } from "../../models/index.js";
import { ToastCode } from "../../common/consts/businessCode.js";
const router = new Router();

// 添加客户
router.post("/customer/add", async (ctx) => {
  try {
    const { customer } = ctx.request.body;
    await Customer.create(customer);
    ctx.body = {
      message: "客户添加成功",
      toastCode: ToastCode.success,
    };
  } catch (error) {
    console.log("9898rrr", error);
    ctx.status = 500;
    ctx.body = {
      message: "客户添加失败",
    };
  }
});

export default router;
