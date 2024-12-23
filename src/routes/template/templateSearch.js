import Router from "koa-router";
import {
  Template,
  GroupOption,
  Question,
  QuestionOption,
} from "../../models/index.js";
import { Op } from "sequelize";
import ErrorObj from "../../common/utils/errorObj.js";

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
    throw new ErrorObj(error);
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
    throw new ErrorObj(error);
  }
});

// 通过id查询模版
router.get("/template/search/id", async (ctx) => {
  try {
    const { id } = ctx.request.query;
    const template = await Template.findOne({
      where: { id },
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
    });
    // ctx.body = template;
    ctx.body = template.dataValues; // 转换为普通对象
  } catch (error) {
    throw new ErrorObj(error);
  }
});

export default router;
