import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

// 定义 Template 模型
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

// 定义 Option 模型
const Option = sequelize.define("Option", {
  value: {
    type: DataTypes.STRING, // 更新为字符串类型
    allowNull: false,
  },
  showText: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// 定义 Question 模型
const Question = sequelize.define("Question", {
  questionName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// 定义 QuestionOption 模型
const QuestionOption = sequelize.define("QuestionOption", {});

// 定义 GroupOption 模型
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

// 设置关系
Template.hasMany(Option, { foreignKey: "templateId", onDelete: "CASCADE" });
Option.belongsTo(Template, { foreignKey: "templateId" });
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

Template.hasMany(Question, { foreignKey: "templateId", onDelete: "CASCADE" });
Question.belongsTo(Template, { foreignKey: "templateId" });

Question.hasMany(QuestionOption, {
  foreignKey: "questionId",
  onDelete: "CASCADE",
});
QuestionOption.belongsTo(Question, { foreignKey: "questionId" });

Option.hasMany(QuestionOption, { foreignKey: "optionId", onDelete: "CASCADE" });
QuestionOption.belongsTo(Option, { foreignKey: "optionId" });

export { Template, Option, Question, QuestionOption, GroupOption };
