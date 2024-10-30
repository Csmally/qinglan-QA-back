import Router from "koa-router";
import {
  Template,
  Option,
  Question,
  QuestionOption,
  GroupOption,
} from "../../models/index.js";
import { ToastCode } from "../../common/consts/businessCode.js";

const router = new Router();

// 添加模板
router.post("/template/add", async (ctx) => {
  try {
    const { templateList } = ctx.request.body;
    for (const templateData of templateList) {
      const { name, desc, optionsConfigList, questionsList, groupsConfigList } =
        templateData;
      // 创建模板
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

      // 批量创建 Option，并返回所有创建的选项数据
      const createdOptions = await Option.bulkCreate(
        optionsConfigList.map((option) => ({
          ...option,
          templateId: template.id,
        })),
        { returning: true }
      );

      // 将 createdOptions 转换为对象，以便快速查找
      const optionsMap = createdOptions.reduce((map, option) => {
        map[option.value] = option.id;
        return map;
      }, {});

      // 创建 Question 和 QuestionOption
      for (const questionData of questionsList) {
        // 创建 Question   直接使用 groupOptionsMap 中的 groupOptionId
        const question = await Question.create({
          questionName: questionData.questionName,
          groupOptionId: groupOptionsMap[questionData.groupBy.value],
          isJudge: questionData.isJudge,
          templateId: template.id,
        });

        // 批量创建 QuestionOption，直接使用 optionsMap 中的 optionId
        const questionOptions = questionData.optionsList.map((option) => ({
          questionId: question.id,
          optionId: optionsMap[option.value], // 从 optionsMap 中找到 optionId
        }));
        await QuestionOption.bulkCreate(questionOptions);
      }
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
