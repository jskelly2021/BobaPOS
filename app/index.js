const express = require('express');
const pool = require('./src/config/database');
const itemsRouter = require('./src/routes/items');

const app = express();
const port = 4001;

app.set("view engine", "ejs");

app.use(express.json());

// Root
app.get('/', async (req, res) => {
    const data = {name: 'Mario'};
    res.render('index', data);
});

app.use('/api/items', itemsRouter);

process.on('SIGINT', function() {
    pool.end();
    console.log('Application successfully shutdown');
    process.exit(0);
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
