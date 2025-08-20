import { getSequelizeInstance } from "../utils/database.js";
import { DataTypes } from "sequelize";

const sequelize = await getSequelizeInstance();

export const User = sequelize.define("session", {
    email: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false
    }
 });

 sequelize.sync().then(() => {
    console.log('Session table created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });