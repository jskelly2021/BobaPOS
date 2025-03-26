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

pool.connect()
    .then(() => console.log('Connected to the database'))
    .catch(err => console.error('Database connection error:', err));

module.exports = pool;
