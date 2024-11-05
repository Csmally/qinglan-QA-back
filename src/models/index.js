import sequelize from "../config/database.js";
import { Template, GroupOption, Question, QuestionOption } from "./Template.js";
import { Customer } from "./Customer.js";
import { Classes } from "./Classes.js";
import { Student } from "./Student.js";

export const initDb = async () => {
  await sequelize.sync({ force: false });
};

export { Template, GroupOption, Question, QuestionOption, Customer, Classes, Student };
