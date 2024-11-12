import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import { Classes } from "./Classes.js";
import { Student } from "./Student.js";
import { Template } from "./Template.js";

const Answer = sequelize.define(
  "Answer",
  {
    templateId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
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
    answerCount: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["templateId", "customerId", "classId", "studentId"],
      },
    ],
    defaultScope: {
      attributes: { exclude: ["createdAt", "updatedAt"] },
    },
  }
);

Template.hasMany(Answer, { foreignKey: "templateId", onDelete: "CASCADE" });
Answer.belongsTo(Template, { foreignKey: "templateId" });

Classes.hasMany(Answer, { foreignKey: "classId", onDelete: "CASCADE" });
Answer.belongsTo(Classes, { foreignKey: "classId", as: "classInfo" });

Student.hasMany(Answer, { foreignKey: "studentId", onDelete: "CASCADE" });
Answer.belongsTo(Student, { foreignKey: "studentId", as: "student" });

export { Answer };
