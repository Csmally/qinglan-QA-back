import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

// 定义 Template 模型 (模版)
const Template = sequelize.define("Template", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  desc: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

// 定义 GroupOption 模型 （题目分类）
const GroupOption = sequelize.define("GroupOption", {
  value: {
    type: DataTypes.STRING, // 更新为字符串类型
    allowNull: false,
  },
  showText: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// 定义 Question 模型 （题目）
const Question = sequelize.define("Question", {
  questionName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isJudge: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

// 定义 QuestionOption 模型 （选项）
const QuestionOption = sequelize.define("QuestionOption", {
  value: {
    type: DataTypes.STRING, // 更新为字符串类型
    allowNull: false,
  },
  showText: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// 设置关系
Template.hasMany(GroupOption, {
  foreignKey: "templateId",
  onDelete: "CASCADE",
});
GroupOption.belongsTo(Template, { foreignKey: "templateId" });

GroupOption.hasMany(Question, {
  foreignKey: "groupOptionId",
  onDelete: "CASCADE",
});
Question.belongsTo(GroupOption, { foreignKey: "groupOptionId" });

Question.hasMany(QuestionOption, { foreignKey: "questionId", onDelete: "CASCADE" });
QuestionOption.belongsTo(Question, { foreignKey: "questionId" });

export { Template, GroupOption, Question, QuestionOption };
