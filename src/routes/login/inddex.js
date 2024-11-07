import Router from "koa-router";
import ErrorObj from "../../common/utils/errorObj.js";
import { ToastCode } from "../../common/consts/businessCode.js";
import adminUserLogin from "./utils/adminUserLogin.js";
import studentUserLogin from "./utils/studentUserLogin.js";
import jwt from "jsonwebtoken";
import SECRET from "../../config/secret.js";

const router = new Router();

// 添加用户
router.post("/login", async (ctx) => {
  try {
    const {
      account,
      password,
      from,
      templateId,
      customerId,
      gradeValue,
      classValue,
    } = ctx.request.body;
    let userInfo;
    // from === 2 toc; from === 1 tob;
    if (from === "2") {
      const studentUserResult = await studentUserLogin({
        templateId,
        customerId,
        gradeValue,
        classValue,
        account,
        password,
      });
      userInfo = studentUserResult;
    } else {
      const adminUserResult = await adminUserLogin({ account, password });
      userInfo = adminUserResult;
    }
    if (!userInfo) {
      throw new ErrorObj(null, "账号或密码错误");
    }
    // 用户验证成功，生成 JWT
    const token = jwt.sign({ account }, SECRET, { expiresIn: "1d" });
    ctx.body = {
      message: "登录成功",
      toastCode: ToastCode.success,
      token,
      ...userInfo.dataValues,
    };
  } catch (error) {
    throw new ErrorObj(error, "账号或密码错误");
  }
});

export default router;
