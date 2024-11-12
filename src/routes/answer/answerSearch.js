import Router from "koa-router";
import { Answer, AnswerInfo, Classes, Student } from "../../models/index.js";
import ErrorObj from "../../common/utils/errorObj.js";
const router = new Router();

// 添加班级
router.post("/answer/searchByClass", async (ctx) => {
  try {
    const { classId } = ctx.request.body;
    const list = await Answer.findAll({
      where: {
        classId,
      },
      include: [
        {
          model: AnswerInfo,
          as: "answers",
        },
        {
          model: Classes,
          as: "classInfo",
        },
        {
          model: Student,
          as: "student",
        },
      ],
    });
    ctx.body = { list };
  } catch (error) {
    throw new ErrorObj(error, "下载失败");
  }
});

export default router;
