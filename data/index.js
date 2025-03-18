const pool = require('./config/database');
const express = require('express');

const itemsRouter = require('./routes/items');

const app = express();
const port = 3000;

app.use(express.json());
app.use('/api/items', itemsRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
