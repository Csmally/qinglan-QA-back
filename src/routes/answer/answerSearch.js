import Router from "koa-router";
import {
  Answer,
  AnswerInfo,
  Student,
  Template,
  GroupOption,
  Question,
  QuestionOption,
  ValueGroup,
} from "../../models/index.js";
import ErrorObj from "../../common/utils/errorObj.js";
const router = new Router();

// 添加班级
router.post("/answer/searchByClass", async (ctx) => {
  try {
    const { classId, templateId } = ctx.request.body;
    const list = await Answer.findAll({
      where: {
        classId,
      },
      attributes: ["answerCount", "updatedAt"],
      include: [
        {
          model: AnswerInfo,
          as: "answers",
          attributes: ["questionId", "questionAnswerId"],
        },
        {
          model: Student,
          as: "student",
          attributes: ["account", "name", "sex", "age"],
        },
      ],
    });
    let template;
    if (list.length === 0) {
      template = null;
    } else {
      template = await Template.findOne({
        where: { id: templateId },
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
                attributes: ["id"],
                include: [
                  {
                    model: QuestionOption,
                    as: "questionOptions",
                    attributes: ["id", "value"],
                  },
                ],
              },
            ],
          },
        ],
      });
    }
    ctx.body = { list, template };
  } catch (error) {
    throw new ErrorObj(error, "下载失败");
  }
});

export default router;
