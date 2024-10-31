import Router from "koa-router";
import {
  Template,
  GroupOption,
  Question,
  QuestionOption,
} from "../../models/index.js";
import { Op } from "sequelize";

const router = new Router();

// 查询模版
router.post("/template/search", async (ctx) => {
  try {
    const { page, pageSize } = ctx.request.body;
    const templates = await Template.findAndCountAll({
      limit: pageSize,
      offset: (page - 1) * pageSize,
      // 其他查询条件
      // where: {},
      order: [["createdAt", "DESC"]], // 排序条件，例如按创建时间倒序
    });
    ctx.body = {
      total: templates.count,
      templateList: templates.rows,
    };
  } catch (error) {
    ctx.status = 500;
  }
});

// 关键字模糊查询模版
router.get("/template/search/keyword", async (ctx) => {
  try {
    const { keyWord } = ctx.request.query;
    const templateList = await Template.findAll({
      where: {
        name: { [Op.like]: `%${keyWord}%` },
      },
    });
    ctx.body = {
      templateList,
    };
  } catch (error) {
    ctx.status = 500;
  }
});

// 通过id查询模版
router.get("/template/search/id", async (ctx) => {
  try {
    const { id } = ctx.request.query;
    const template = await Template.findOne({
      where: { id },
      attributes: ["id", "name", "desc"],
      include: [
        {
          model: GroupOption,
          attributes: ["id", "value", "showText"],
          as: "groupOptions",
          include: [
            {
              model: Question,
              attributes: ["id", "questionName", "isJudge"],
              as: "questions",
              include: [
                {
                  model: QuestionOption,
                  attributes: ["id", "value", "showText"],
                  as: "questionOptions",
                },
              ],
            },
          ],
        },
      ],
    });
    // ctx.body = template;
    ctx.body = template ? template.toJSON() : {}; // 转换为普通对象
  } catch (error) {
    ctx.status = 500;
  }
});

export default router;
