import { DataTypes } from "sequelize";
const sequelize = require("@/config/database");

// 定义 Template 模型
const Template = sequelize.define("Template", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  desc: {
    type: DataTypes.TEXT,
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

// 设置关系
Template.hasMany(Option, { foreignKey: "templateId", onDelete: "CASCADE" });
Option.belongsTo(Template, { foreignKey: "templateId" });

Template.hasMany(Question, { foreignKey: "templateId", onDelete: "CASCADE" });
Question.belongsTo(Template, { foreignKey: "templateId" });

Question.hasMany(QuestionOption, {
  foreignKey: "questionId",
  onDelete: "CASCADE",
});
QuestionOption.belongsTo(Question, { foreignKey: "questionId" });

Option.hasMany(QuestionOption, { foreignKey: "optionId", onDelete: "CASCADE" });
QuestionOption.belongsTo(Option, { foreignKey: "optionId" });

export default Template;
