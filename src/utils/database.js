import { Sequelize } from 'sequelize';
import config from '../config.js';

let sequelizeInstance = null;

export const connectToDatabase = async () => {
  if (sequelizeInstance) {
    return sequelizeInstance;
  }
  try {
    console.log(config)
    const sequelize = new Sequelize(
      config.database.name,
      config.database.user,
      config.database.password, {
        host: config.database.host,
        port: config.database.port,
        dialect: 'postgres'
      }
    );
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    sequelizeInstance = sequelize;
    return sequelize;
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error;
  }
};

export const getSequelizeInstance = async () => {
  if (!sequelizeInstance) {
    await connectToDatabase()
    return sequelizeInstance;
  }
  return sequelizeInstance;
};

export const closeDatabaseConnection = async () => {
  if (sequelizeInstance) {
    try {
      await sequelizeInstance.close();
      console.log('Database connection closed successfully.');
      sequelizeInstance = null; // Reset the instance after closing
    } catch (error) {
      console.error('Error closing the database connection:', error);
    }
  } else {
    console.log("No database connection to close.");
  }
};