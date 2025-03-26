const { Pool } = require('pg');
require('dotenv').config();

// Sets up database connection pool
const pool = new Pool({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432,
});

module.exports = pool;
