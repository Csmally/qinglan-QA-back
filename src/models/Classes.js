import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import { Customer } from "./Customer.js";

const Classes = sequelize.define(
  "Classes",
  {
    grade: {
      type: DataTypes.STRING(191),
      allowNull: false,
    },
    gradeText: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    class: {
      type: DataTypes.STRING(191),
      allowNull: false,
    },
    classText: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // 定义复合唯一约束
    indexes: [
      {
        unique: true,
        fields: ["grade", "class", "customerId"],
      },
    ],
    defaultScope: {
      attributes: { exclude: ["createdAt", "updatedAt"] },
    },
  }
);

Customer.hasMany(Classes, { foreignKey: "customerId", onDelete: "CASCADE" });
Classes.belongsTo(Customer, { foreignKey: "customerId" });

export { Classes };
