require('dotenv').config();

const { Pool } = require('pg');

const pool = new Pool({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432,
});

pool.query('SELECT * FROM item;')
    .then(result => {
        console.log(result.rows);
    })
    .catch(err => {
        console.error('Error querying the database:', err);
    })
    .finally(() => {
        pool.end();
    });
