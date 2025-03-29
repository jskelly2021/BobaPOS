const express = require('express');
const cors = require('cors');
const itemsRouter = require('./routes/items');
const ingredientsRouter = require('./routes/ingredients');
const employeesRouter = require('./routes/employee');

const app = express();
const port = 4001;

app.use(express.json());
app.use(cors());
app.use('/api/items', itemsRouter);
app.use('/api/ingredients', ingredientsRouter);
app.use('/api/employees', employeesRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
