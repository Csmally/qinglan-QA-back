import sequelize from "@/config/database.js";
import Template from "./Template.js";

export const initDb = async () => {
  await sequelize.sync({ force: false });
};

export { Template };
