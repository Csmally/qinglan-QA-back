import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import { Answer } from "./Answer.js";

const AnswerInfo = sequelize.define(
  "AnswerInfo",
  {
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    classId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    studentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    templateId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    groupOptionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    questionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    questionAnswerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    defaultScope: {
      attributes: { exclude: ["createdAt", "updatedAt"] },
    },
  }
);

Answer.hasMany(AnswerInfo, {
  foreignKey: "answerId",
  onDelete: "CASCADE",
  as: "answers",
});
AnswerInfo.belongsTo(Answer, { foreignKey: "answerId" });

export { AnswerInfo };
