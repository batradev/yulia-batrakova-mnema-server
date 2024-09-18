require('dotenv').config();

const baseConfig = {
  client: 'mysql2',  // Use mysql2 for all environments
  connection: {
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './src/migrations',
  },
  seeds: {
    directory: './src/seeds',
  },
};

module.exports = {
  development: {
    ...baseConfig,
  },

  production: {
    ...baseConfig,
  },
};
