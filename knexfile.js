require('dotenv').config();

module.exports = {
  development: {
    client: 'mysql2',  
    connection: {
      database: process.env.DB_LOCAL_DBNAME,
      user: process.env.DB_LOCAL_USER,
      password: process.env.DB_LOCAL_PASSWORD,
      host: process.env.DB_LOCAL_HOST || 'localhost',
      port: process.env.DB_LOCAL_PORT || 3306,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './src/migrations',
    },
    seeds: {
      directory: './src/seeds',
    },
   
  },
};
