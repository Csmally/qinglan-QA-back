import sequelize from "../config/database.js";
import { Template, GroupOption, Question, QuestionOption, ValueGroup } from "./Template.js";
import { Customer } from "./Customer.js";
import { Classes } from "./Classes.js";
import { Student } from "./Student.js";
import { AdminUser } from "./AdminUser.js";
import { Answer } from "./Answer.js";
import { AnswerInfo } from "./AnswerInfo.js";

export const initDb = async () => {
  await sequelize.sync({ force: false });
};

export {
  Template,
  GroupOption,
  Question,
  QuestionOption,
  Customer,
  Classes,
  Student,
  AdminUser,
  Answer,
  AnswerInfo,
  ValueGroup,
};
