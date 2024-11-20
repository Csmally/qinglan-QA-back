import Router from "koa-router";
import { Answer, AnswerInfo } from "../../models/index.js";
import { ToastCode } from "../../common/consts/businessCode.js";
import ErrorObj from "../../common/utils/errorObj.js";
import sequelize from "../../config/database.js";
const router = new Router();

// 添加班级
router.post("/addAnswer/add", async (ctx) => {
  const transaction = await sequelize.transaction();
  try {
    const { templateId, customerId, classId, studentId, answers } =
      ctx.request.body;
    const oldAnswer = await Answer.findOne({
      where: {
        templateId,
        customerId,
        classId,
        studentId,
      }
    });
    if (oldAnswer?.dataValues?.answerCount > 4) {
      throw new ErrorObj(null, "超过最大提交次数");
    }
    if (oldAnswer) {
      await Answer.update(
        {
          templateId,
          customerId,
          classId,
          studentId,
          answerCount: sequelize.literal("answerCount + 1"), // 使用 SQL 表达式递增 answerCount
        },
        {
          where: {
            templateId,
            customerId,
            classId,
            studentId,
          },
        }
      );
      await AnswerInfo.destroy({
        where: { answerId: oldAnswer.dataValues.id },
      });
      await AnswerInfo.bulkCreate(
        answers.map((answer) => ({
          ...answer,
          answerId: oldAnswer.dataValues.id,
        }))
      );
    } else {
      await Answer.create(
        {
          templateId,
          customerId,
          classId,
          studentId,
          answerCount: 1,
          answers: answers.map((answer) => answer),
        },
        {
          include: [
            {
              model: AnswerInfo,
              as: "answers",
            },
          ],
        }
      );
    }
    await transaction.commit();
    ctx.body = {
      message: "提交成功",
      toastCode: ToastCode.success,
    };
  } catch (error) {
    await transaction.rollback();
    throw new ErrorObj(error, error.message || "提交失败");
  }
});

export default router;
