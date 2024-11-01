import Router from "koa-router";
import {
  Template,
  GroupOption,
  Question,
  QuestionOption,
} from "../../models/index.js";
import { ToastCode } from "../../common/consts/businessCode.js";
import sequelize from "../../config/database.js";
const router = new Router();

// 添加模板
router.post("/template/add", async (ctx) => {
  // 利用 sequelize.transaction 确保数据一致性，并通过 include 传递嵌套关联。
  const transaction = await sequelize.transaction();
  try {
    const { templateList } = ctx.request.body;
    for (const templateData of templateList) {
      await Template.create(
        {
          name: templateData.name,
          desc: templateData.desc,
          groupOptions: templateData.groupOptions.map((group) => ({
            ...group,
            questions: group.questions.map((question) => ({
              ...question,
              questionOptions: question.questionOptions,
            })),
          })),
        },
        {
          include: [
            {
              model: GroupOption,
              as: "groupOptions",
              include: [
                {
                  model: Question,
                  as: "questions",
                  include: [
                    {
                      model: QuestionOption,
                      as: "questionOptions",
                    },
                  ],
                },
              ],
            },
          ],
          transaction,
        }
      );
    }
    await transaction.commit();
    ctx.body = {
      message: "模板添加成功",
      toastCode: ToastCode.success,
    };
  } catch (error) {
    await transaction.rollback();
    ctx.status = 500;
    ctx.body = {
      message: "模板添加失败",
    };
  }
});

export default router;
