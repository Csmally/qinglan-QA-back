import Router from "koa-router";
import { Template, GroupOption, Question, QuestionOption } from "../../models/index.js";
import { ToastCode } from "../../common/consts/businessCode.js";

const router = new Router();

// 添加模板
router.post("/template/add", async (ctx) => {
  try {
    const { templateList } = ctx.request.body;
    for (const templateData of templateList) {
      const { name, desc, questionsList, groupsConfigList } = templateData;
      // 创建模板 Template
      const template = await Template.create({ name, desc });

      // 批量创建 GroupOption，并返回所有创建的选项数据
      const createdGroupOptions = await GroupOption.bulkCreate(
        groupsConfigList.map((option) => ({
          ...option,
          templateId: template.id,
        })),
        { returning: true }
      );
      
      // 将 createdGroupOptions 转换为对象，以便快速查找
      const groupOptionsMap = createdGroupOptions.reduce((map, groupOption) => {
        map[groupOption.value] = groupOption.id;
        return map;
      }, {});
      
      // 批量创建 Question，并返回所有创建的选项数据
      const createdQuestions = await Question.bulkCreate(
        questionsList.map((question) => ({
          ...question,
          groupOptionId: groupOptionsMap[question.groupBy],
        })),
        { returning: true }
      );
      
      // 批量创建 QuestionOption, 并返回所有创建的选项数据
    }
    ctx.body = {
      message: "模板添加成功",
      toastCode: ToastCode.success,
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      message: "模板添加失败",
    };
  }
});

export default router;
