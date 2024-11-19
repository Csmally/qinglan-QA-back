import Router from "koa-router";
import { Student } from "../../models/index.js";
import ErrorObj from "../../common/utils/errorObj.js";

const router = new Router();

// 查询客户
router.post("/student/search", async (ctx) => {
  try {
    const { page, pageSize, classId } = ctx.request.body;
    const list = await Student.findAndCountAll({
      limit: pageSize,
      offset: (page - 1) * pageSize,
      // 其他查询条件
      where: { classId },
      order: [["createdAt", "DESC"]], // 排序条件，例如按创建时间倒序
    });
    ctx.body = {
      total: list.count,
      list: list.rows,
    };
  } catch (error) {
    throw new ErrorObj(error);
  }
});

// 根据学校和班级查询学生信息
router.post("/student/searchByClass", async (ctx) => {
  try {
    const { customerId, classId } = ctx.request.body;
    const list = await Student.findAndCountAll({
      // 其他查询条件
      where: { customerId, classId },
      order: [["createdAt", "DESC"]], // 排序条件，例如按创建时间倒序
    });
    ctx.body = {
      total: list.count,
      list: list.rows,
    };
  } catch (error) {
    throw new ErrorObj(error);
  }
});

export default router;
