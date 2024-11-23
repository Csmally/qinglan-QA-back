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
}, {
  defaultScope: {
    attributes: {
      exclude: ["createdAt", "updatedAt"]
    }
  }
});

// 定义 GroupOption 模型 （题目分类）
const GroupOption = sequelize.define("GroupOption", {
  shortName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  showText: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  defaultScope: {
    attributes: {
      exclude: ["createdAt", "updatedAt"]
    }
  }
});

// 定义 Question 模型 （题目）
const Question = sequelize.define("Question", {
  questionName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  defaultScope: {
    attributes: { exclude: ["createdAt", "updatedAt"] },
  },
});

// 定义 QuestionOption 模型 （选项）
const QuestionOption = sequelize.define("QuestionOption", {
  value: {
    type: DataTypes.INTEGER, // 更新为字符串类型
    allowNull: false,
  },
  showText: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  defaultScope: {
    attributes: {
      exclude: ["createdAt", "updatedAt"]
    }
  }
});

// 定义分组评分规则
const ValueGroup = sequelize.define("ValueGroup", {
  minValue: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  maxValue: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  valueDesc: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  valueSug: {
    type: DataTypes.TEXT,
    allowNull: false,
  }
}, {
  defaultScope: {
    attributes: {
      exclude: ["createdAt", "updatedAt"]
    }
  }
})

// 设置关系
Template.hasMany(GroupOption, {
  foreignKey: "templateId",
  onDelete: "CASCADE",
  as: "groupOptions",
});
GroupOption.belongsTo(Template, { foreignKey: "templateId" });

GroupOption.hasMany(Question, {
  foreignKey: "groupOptionId",
  onDelete: "CASCADE",
  as: "questions",
});
Question.belongsTo(GroupOption, { foreignKey: "groupOptionId" });

GroupOption.hasMany(ValueGroup, {
  foreignKey: "groupOptionId",
  onDelete: "CASCADE",
  as: "valueGroups",
});
ValueGroup.belongsTo(GroupOption, { foreignKey: "groupOptionId" });

Question.hasMany(QuestionOption, {
  foreignKey: "questionId",
  onDelete: "CASCADE",
  as: "questionOptions",
});
QuestionOption.belongsTo(Question, { foreignKey: "questionId" });

export { Template, GroupOption, Question, QuestionOption, ValueGroup };
