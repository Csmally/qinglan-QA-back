import sequelize from "../config/database.js";
import {
  Template,
  Option,
  Question,
  QuestionOption,
  GroupOption,
} from "./Template.js";

export const initDb = async () => {
  await sequelize.sync({ force: false });
};

export { Template, Option, Question, QuestionOption, GroupOption };
