import { Sequelize } from "sequelize";

// 配置数据库连接信息
const sequelize = new Sequelize("ql_db_dev", "root", "cy4u1314", {
  host: "localhost",
  dialect: "mysql",
});

export default sequelize;
