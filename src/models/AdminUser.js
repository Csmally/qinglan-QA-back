import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const AdminUser = sequelize.define("AdminUser", {
  account: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // 设置唯一
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  mobile: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  sex: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  age: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

export { AdminUser };
