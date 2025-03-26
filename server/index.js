const express = require('express');
const cors = require('cors');
const pool = require('./config/database');
const itemsRouter = require('./routes/items');

const app = express();
const port = 4001;

app.use(express.json());
app.use(cors());
app.use('/items', itemsRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
