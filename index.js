const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const pool = require('./src/config/database');
const app = express();
const itemsRouter = require('./src/routes/items');

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'src', 'views'));
app.set('layout', 'layouts/layout');

app.use(expressLayouts);
app.use(express.static('public'));
app.use('/items', itemsRouter);

const port = 3001;
app.listen(process.env.PORT || port, () => {
    console.log(`App listening at http://localhost:${port}`);
});

// Root
app.get('/', async (req, res) => {
    const data = {name: 'Mario'};
    res.render('index', data);
});

process.on('SIGINT', function() {
    pool.end();
    console.log('Application successfully shutdown');
    process.exit(0);
});


