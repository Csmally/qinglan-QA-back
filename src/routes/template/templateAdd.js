import Router from "koa-router";
import {
  Template,
  GroupOption,
  Question,
  QuestionOption,
  ValueGroup,
} from "../../models/index.js";
import { ToastCode } from "../../common/consts/businessCode.js";
import sequelize from "../../config/database.js";
import ErrorObj from "../../common/utils/errorObj.js";
const router = new Router();

// 添加模板
router.post("/template/add", async (ctx) => {
  // 利用 sequelize.transaction 确保数据一致性，并通过 include 传递嵌套关联。
  const transaction = await sequelize.transaction();
  try {
    const { templateList } = ctx.request.body;
    for (const templateData of templateList) {
      await Template.create(templateData, {
        include: [
          {
            model: GroupOption,
            as: "groupOptions",
            include: [
              {
                model: ValueGroup,
                as: "valueGroups",
              },
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
      });
    }
    await transaction.commit();
    ctx.body = {
      message: "模板添加成功",
      toastCode: ToastCode.success,
    };
  } catch (error) {
    await transaction.rollback();
    throw new ErrorObj(error, "模板添加失败");
  }
});

export default router;
