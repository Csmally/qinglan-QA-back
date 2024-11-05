import Router from "koa-router";
import { AdminUser } from "../../models/index.js";
import ErrorObj from "../../common/utils/errorObj.js";
import { ToastCode } from "../../common/consts/businessCode.js";
import jwt from "jsonwebtoken";
import SECRET from "../../config/secret.js";

const router = new Router();

// 添加用户
router.post("/login", async (ctx) => {
  try {
    const { account, password, from } = ctx.request.body;
    const adminUser = await AdminUser.findOne({
      where: {
        account,
      },
    });
    if (!adminUser || adminUser.dataValues.password !== password) {
      throw new ErrorObj(null, "账号或密码错误");
    }
    // 用户验证成功，生成 JWT
    const token = jwt.sign({ account }, SECRET, { expiresIn: "1d" });
    ctx.body = {
      message: "登录成功",
      toastCode: ToastCode.success,
      token,
      ...adminUser.dataValues,
    };
  } catch (error) {
    throw new ErrorObj(error, "账号或密码错误11");
  }
});

export default router;
