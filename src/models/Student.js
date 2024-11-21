import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import { Classes } from "./Classes.js";
import { Customer } from "./Customer.js";

const Student = sequelize.define(
  "Student",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    account: {
      type: DataTypes.STRING(191),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sex: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    // 定义复合唯一约束
    indexes: [
      {
        unique: true,
        fields: ["account", "customerId"],
      },
    ],
    defaultScope: {
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    },
  }
);

Customer.hasMany(Student, { foreignKey: "customerId", onDelete: "CASCADE" });
Student.belongsTo(Customer, { foreignKey: "customerId", as: "customerBelong" });

Classes.hasMany(Student, { foreignKey: "classId", onDelete: "CASCADE" });
Student.belongsTo(Classes, { foreignKey: "classId", as: "classBelong" });

export { Student };
