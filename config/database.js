/**
 * Database configuration.
 */

const defaultPort = 5432;
require('dotenv').config();

module.exports = {
    database: process.env.DB_NAME,
    dialect: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    password: process.env.DB_PASS,
    ssl: process.env.DB_SSL === 'true',
    port: parseInt(process.env.DB_PORT, 10) || defaultPort,
    logging: process.env.DB_LOG_SQL === 'true' ? console.log : false,
    username: process.env.DB_USER
};
