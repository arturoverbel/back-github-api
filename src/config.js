const config = {
  port: parseInt(process.env.PORT) || 3000,
  privateKey: process.env.PRIVATE_KEY,
  database: {
    name: process.env.DATABASE_NAME || 'postgres',
    user: process.env.DATABASE_USERNAME || 'user',
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT) || 5432,
  },
};
export default config;