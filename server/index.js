require('dotenv').config();

const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('./config/passportConfig');
const { ensureLoggedIn, requireRole } = require('./middleware/authMiddleware');

const itemsRouter = require('./routes/items');
const ingredientsRouter = require('./routes/ingredients');
const employeesRouter = require('./routes/employee');
const ordersRouter = require('./routes/orders');
const toppingsRouter = require('./routes/toppings');
const weatherRouter = require('./routes/weather');

const authRouter = require('./routes/auth');
const analyticsRouter = require('./routes/analytics');


const app = express();
const port = 4001;

app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_ORIGIN,
    credentials: true,
}));


// Session middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: 
        {
            sameSite: 'lax',   // ← allow cross-site in dev
            secure: false      // ← allow HTTP in dev
        }
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/auth', authRouter);
/*app.use('/api/items', itemsRouter);
app.use('/api/ingredients', ingredientsRouter);
app.use('/api/employees', employeesRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/toppings', toppingsRouter);
app.use('/api/analytics', analyticsRouter);
app.use('/api/weather', weatherRouter);
app.use('/api/analytics', analyticsRouter);*/

// both cashier & manager can read items; only manager can create/update/delete
app.use(
    '/api/items',
    ensureLoggedIn,
    requireRole('CASHIER','MANAGER'),
    itemsRouter
    );

app.use(
    '/api/ingredients',
    ensureLoggedIn,
    requireRole('CASHIER','MANAGER'),
    ingredientsRouter
);

// manager only: employee Cridentials 
app.use(
    '/api/employees',
    ensureLoggedIn,
    requireRole('MANAGER'),
    employeesRouter
    );

// cashiers & managers can place orders
app.use(
    '/api/orders',
    ensureLoggedIn,
    requireRole('CASHIER','MANAGER'),
    ordersRouter
    );

app.use(
    '/api/toppings',
    ensureLoggedIn,
    requireRole('CASHIER','MANAGER'),
    toppingsRouter
    );

// analytics is manager-only
app.use(
    '/api/analytics',
    ensureLoggedIn,
    requireRole('MANAGER'),
    analyticsRouter
    );


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
