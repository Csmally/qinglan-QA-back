import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const AdminUser = sequelize.define(
  "AdminUser",
  {
    account: {
      type: DataTypes.STRING,
      allowNull: false,
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
  },
  {
    // 定义复合唯一约束
    indexes: [
      {
        unique: true,
        fields: ["account", "password"],
      },
    ],
  }
);

export { AdminUser };
