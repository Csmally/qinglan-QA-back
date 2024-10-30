import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import { Template } from "./Template.js";

// 定义 Customer 模型
const Customer = sequelize.define("Customer", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  desc: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

Template.hasMany(Customer, { foreignKey: "templateId", onDelete: "CASCADE" });
Customer.belongsTo(Template, { foreignKey: "templateId" });

export { Customer };
