import Router from "koa-router";
import { AdminUser } from "../../models/index.js";
import ErrorObj from "../../common/utils/errorObj.js";
import { ToastCode } from "../../common/consts/businessCode.js";

const router = new Router();

// 修改密码
router.post("/user/changePassword", async (ctx) => {
  try {
    const { password, id } = ctx.request.body;
    await AdminUser.update(
      {
        password,
      },
      {
        where: { id },
      }
    );
    ctx.body = {
      message: "修改成功",
      toastCode: ToastCode.success,
    };
  } catch (error) {
    throw new ErrorObj(error);
  }
});

export default router;
