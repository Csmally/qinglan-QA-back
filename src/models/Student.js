import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import { Classes } from "./Classes.js";

const Student = sequelize.define(
  "Student",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    account: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sex: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    // 定义复合唯一约束
    indexes: [
      {
        unique: true,
        fields: ["account", "classId"],
      },
    ],
  }
);

Classes.hasMany(Student, { foreignKey: "classId", onDelete: "CASCADE" });
Student.belongsTo(Classes, { foreignKey: "classId" });

export { Student };
