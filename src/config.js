
const config = {
    port: process.env.PORT || 3000,
    privateKey: process.env.PRIVATE_KEY || null,
    databaseName: process.env.DATABASE_NAME || 'postgres',
    databaseUser: process.env.DATABASE_USERNAME || 'user',
    databasePassword: process.env.DATABASE_PASSWORD || 'password',
    databaseHost: process.env.DATABASE_HOST || 'localhost',
    databasePort: process.env.DATABASE_PORT || 5432,
};
export default config;