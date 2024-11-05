import Router from "koa-router";
import { Customer } from "../../models/index.js";
import { ToastCode } from "../../common/consts/businessCode.js";
import ErrorObj from "../../common/utils/errorObj.js";
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
    throw new ErrorObj(error, "客户添加失败");
  }
});

export default router;
