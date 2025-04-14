require('dotenv').config();

const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('./config/passportConfig');

const itemsRouter = require('./routes/items');
const ingredientsRouter = require('./routes/ingredients');
const employeesRouter = require('./routes/employee');
const ordersRouter = require('./routes/orders');
const toppingsRouter = require('./routes/toppings');

const authRouter = require('./routes/auth');        // Import your new auth routes
const analyticsRouter = require('./routes/analytics'); // Import your new analytics routes


const app = express();
const port = 4001;

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));


// Session middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
})
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRouter);
app.use('/api/items', itemsRouter);
app.use('/api/ingredients', ingredientsRouter);
app.use('/api/employees', employeesRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/toppings', toppingsRouter);
app.use('/api/analytics', analyticsRouter);


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
