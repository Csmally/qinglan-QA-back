import Router from "koa-router";
import { Customer } from "../../models/index.js";
import { Op } from "sequelize";

const router = new Router();

// 查询客户
router.post("/customer/search", async (ctx) => {
  try {
    const { page, pageSize } = ctx.request.body;
    const list = await Customer.findAndCountAll({
      limit: pageSize,
      offset: (page - 1) * pageSize,
      // 其他查询条件
      // where: {},
      order: [["createdAt", "DESC"]], // 排序条件，例如按创建时间倒序
    });
    ctx.body = {
      total: list.count,
      list: list.rows,
    };
  } catch (error) {
    ctx.status = 500;
  }
});

// 关键字模糊查询模版
router.get("/customer/search/keyword", async (ctx) => {
  try {
    const { keyWord } = ctx.request.query;
    const customerList = await Customer.findAll({
      where: {
        name: { [Op.like]: `%${keyWord}%` },
      },
    });
    ctx.body = {
      customerList,
    };
  } catch (error) {
    ctx.status = 500;
  }
});

// 通过id查询模版
router.get("/customer/search/id", async (ctx) => {
  try {
    const { id } = ctx.request.query;
    const customer = await Customer.findOne({
      where: { id },
      attributes: ["id", "name", "desc"],
    });
    ctx.body = customer ? customer.toJSON() : {}; // 转换为普通对象
  } catch (error) {
    ctx.status = 500;
  }
});

export default router;
